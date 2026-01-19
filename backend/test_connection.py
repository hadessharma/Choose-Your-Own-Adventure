import os
import psycopg2
from dotenv import load_dotenv
from urllib.parse import urlparse, urlunparse, quote_plus

load_dotenv()

original_url = os.getenv("DATABASE_URL")
admin_secret = os.getenv("ADMIN_SECRET")

def test_connection(url, name):
    print(f"\n[{name}] Connecting...")
    try:
        # Parse just to mask password in print
        p = urlparse(url)
        safe_netloc = p.netloc
        if '@' in p.netloc:
            auth, host = p.netloc.rsplit('@', 1)
            safe_netloc = f"***:***@{host}"
        print(f"Target: {urlunparse(p._replace(netloc=safe_netloc))}")
        
        conn = psycopg2.connect(url)
        print(f"[{name}] SUCCESS! The password is correct.")
        conn.close()
        return True
    except psycopg2.OperationalError as e:
        print(f"[{name}] FAILED: {e}")
        return False
    except Exception as e:
        print(f"[{name}] ERROR (Not Connection): {e}")
        return False

# 1. Test Original
test_connection(original_url, "Original")

# 2. Test Admin Secret as Password (Encapsulated)
if admin_secret:
    try:
        parsed = urlparse(original_url)
        # We need to reconstruction the netloc with encoded password
        # Expected netloc: user:password@host:port
        if '@' in parsed.netloc:
            # existing auth
            user_pass, host_port = parsed.netloc.rsplit('@', 1)
            if ':' in user_pass:
                username = user_pass.split(':')[0]
                # Encode the secret!
                encoded_secret = quote_plus(admin_secret)
                new_netloc = f"{username}:{encoded_secret}@{host_port}"
                new_url = urlunparse(parsed._replace(netloc=new_netloc))
                
                if test_connection(new_url, "With ADMIN_SECRET"):
                    print(f"\n>>> FOUND VALID CREDENTIALS! Update .env to use ADMIN_SECRET. <<<")
    except Exception as e:
        print(f"Script Error: {e}")
