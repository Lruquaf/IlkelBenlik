1- Deploy işlemi öncesi gerekli bilgiler:
    1-1- Koleksiyonun adresi (IPFS içerisinde veya cloud'da tutulabilir. IPFS için Pinata kullanabiliriz.)
        Pinata içerisine önce Koleksiyonun resimlerini ekliyoruz. Ardından Pinatanın oluşturduğu CID ile 
        koleksiyonun Metadatasını güncelliyoruz ve metadata'yı upload ediyoruz.
        https://www.pinata.cloud/

        ipfs://[PINATA_METADATA_CID]/ -> Bu şekilde contract içerisinde BASE_URI'ye atama yapıyoruz.

    1-2- Alchemy ile management networking işlemlerinin takibini sağlıyoruz.
        Alchemy üzerinde bir app create adiyoruz ve network belirliyoruz. (Test için Goerli/ Satış için Mainnet)
        App'in https adresini .env altında API_URL'e ekliyoruz.
        https://www.alchemy.com/

    1-3- Metamask Private Key Alma
        Metamask cüzdanımızda cüzdan adının yanındaki ... butonu altında Hesap bilgilerine giriyoruz ve özel anahtar
        dışa aktar diyoruz ve şifremizi giriyoruz. çıkan anahtarı .env altında PRIVATE_KEY alanına kopyalıyoruz.

    1-4- Etherscan api key:
        https://etherscan.io/login adresinden giriş yapıyoruz. Profil altından API Keys başlığına gidiyoruz ve bir API key oluşturuyoruz.
        Bu key .env altında ETHERSCAN_API_KEY değişkenine atanıyor.

2- Contract düzenleme
    Contract dosyasının içerisinde tüm düzenleme yapılabilecek alanlara yorum satırı eklendi bu alanları düzenleyerek
    deploy işlemine hazır hale getirilebilir.

3- NPM Install
    Tüm gerekli paketler package.json altında kayıtlı sadece npm install yapılmalı.

4- 'npx hardhat compile' konutunu çalıştır.
    artifacts klasörü oluşacaktır.

5- 'npx hardhat run scripts/deploy.js --network goerli' komutunu çalıştırarak deploy edilmeli.
    Network alanı test için goerli / mainnet için mainnet
    Dönen adres bir kenara kopyalanmalı. Verify işlemi sırasında lazım olacak.

6- npx hardhat verify --network goerli 0x73D0f03e1477D74CB39c971E03786A5144CA82E5 'Ilkel' 'ID' '0x822d4390d533Cc278124b35b8579B74d7C589d8C'
    Network alanı test için goerli / mainnet için mainnet
    Ardından koplayadığımız contract adresi onun ardından deploy.js altında kullandığımız name, symbol ve address bilgileri tırnak içinde yazılmalı
    Ve komut bu şekilde çalıştırılmalı

7- etherscan.io adresinden contract durumu kontrol edilebilir ve düzenlemeler yapılabilir.
    7-1- Contract altında read contract ile contractın durumuna ulaşılabilir.
    7-2- Contract altında write contract ile contract üzeriden değişiklikler yapılabilir. 
        Satışa açıp kapatma / reveal işlemleri gibi.

NOTE
    https://goerlifaucet.com/ adresinden goerli testnet için test ethereum alınabilir.