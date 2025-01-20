import subprocess
import http.server
import socketserver
import threading
import os
import time

# Sunucuyu başlatma
def start_server(port):
    os.chdir('script')  # HTML, CSS, JS dosyalarının bulunduğu klasöre git
    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", port), handler) as httpd:
        print(f"Sunucu http://localhost:{port} üzerinde çalışıyor... CODDED BY ARDA_TMZKN INSTAGRAM")
        httpd.serve_forever()

# Localtunnel ile tünel oluşturma
def start_localtunnel(port):
    print("Localtunnel başlatılıyor... arda_tmzkn [KNAVES]")
    # Localtunnel için subprocess başlatma
    lt = subprocess.Popen(['lt', '--port', str(port)], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    # Localtunnel çıktısını kontrol etme
    while True:
        line = lt.stdout.readline()
        if b'Forwarding' in line:
            url = line.decode('utf-8').strip().split(' ')[-1]  # URL'yi almak için
            print(f"Siteye şu adresten erişebilirsiniz: {url}   CODDED BY ARDA_TMZKN")
        if lt.poll() is not None:
            break

# Ana fonksiyon
def main():
    port = 8000  # Varsayılan port
    server_thread = threading.Thread(target=start_server, args=(port,))
    server_thread.start()  # Sunucuyu başlat
    time.sleep(2)  # Sunucunun başlatılmasını bekle
    start_localtunnel(port)  # Localtunnel ile tünel oluştur

if __name__ == "__main__":
    main()
