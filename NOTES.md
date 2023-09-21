CONTRACT:
    <!-- 1- L2: "^" kullanmamak daha iyi olabilir, stabillik açısından. -->
    <!-- 2- L5: ERC721Enumerable importu kaldırılmalı, kullanılmamış. -->
    <!-- 3- L7: Counters kütüphanesini kullanmak yerine counting işlemlerini kendimiz yapabiliriz. (gaz optimizasyonu) -->
    <!-- 4- L10-14: Proxy tipi kontratlar oluşturulmuş, ancak içi boş gibi. Kullanım amacı ve hangi aşamada olduğu açıklanmalı. (??) -->
    <!-- 5- L16: Kontrat ismi "ilkel" olarak kalacak mı, yoksa "IlkelBenlik" tarzı daha şık ve naming conventions gözeten adlandırma yapılmalı mı? (?) -->
    <!-- 6- L18-19: Bkz -> Madde 3 -->
    <!-- 7- L21: Bkz -> Madde 4 -->
    <!-- 8- L24: Reveal sonrası update olması logicten kaynaklı olarak URI sorgusunda güncellenmiş biçimde göreceğiz, diye anlıyorum. -->
    <!-- 9- L35: INCREASED_MAX_TOKEN_ID anlaşılmadı. (+2 yerine +1 olmalı) (??) -->
    <!-- 10- L33-42: Bu değerleri hardcoded olarak tanımlamak yerine deployment sırasında constructorda manuel olarak girilebilir ve dolayısıyla değişkenleri constant yerine immutable olarak işaretlemek gerekecektir. Bu biçimde geliştirme test aşamasında kolaylık sağlar. -->
    <!-- 11- L44: uint yerine uint256 kullanmayı tercih ediyorum. Temelde ikisi arasında fark olmasa da uint256 okunabilirlik ve tutarlılık açısından daha iyidir. -->
    <!-- 12- L46-49: Bkz -> Madde 10 -->
    <!-- 13- L55-56, L58: Koleksiyonun isim ve sembolünü direkt olarak string halde koyabiliriz. -->
    <!-- 14- L59: Bkz -> Madde 4 -->
    <!-- 15- L60: Token id numaraları 0'dan mı başlayacak, 1'den mi? (??) -->
    <!-- 16- L67: Reveal esnasında URI'ın da mock halinden gerçek haline gelmesini istiyoruz. Tek fonksiyonda halledilebilir. -->
    <!-- 17- L78: String tipi hata içeren tüm require ifadelerini revert ile custom error yapabiliriz.(gaz optimizasyonu) -->
    <!-- 18- L78: tx.origin kullanmak genellikle risklidir. Sanırım burada kontrat çağrılarından kaçınmak amacıyla böyle bir modifier yazıldı. İyileştirilebilir, başka çözümler var. -->
    <!-- 19- L83, L94: fonksiyon neden _to parametresi alıyor, neden hiç kullanılmadan msg.sender olarak değiştiriliyor? (??) -->
    <!-- 20- L89: ">=" yerine "==" koyulabilir. Böylece alıcıdan fazla para alınmamış olur. (??) -->
    <!-- 21- L93: Bkz -> Madde 3 -->
    <!-- 22- L97: Bkz -> Madde 9 -->
    <!-- 23- L117-118: Bkz -> Madde 3 -->
    <!-- 24- L133-138: Reveal olmadan önce rastgele bir BaseURI kontratta bulunacak, Reveal true olurken BaseURI da gerçek URI ile güncelleyeceğiz mi? (??) -->
    <!-- 25- L154: Belirlenmiş cüzdan adreslerinin doğruluğuna azami ölçüde dikkat edilmeli, bunlar eğer kontrat adresiyse reentrancy riski oluşabilir. -->
    <!-- 26- L163: Bu _withdraw, kontratta bakiye kalırsa diye mi? Hesaba göre para kalmıyor hiç. Lüzumsuz _withdraw. -->
    <!-- 27- L177: Bkz -> Madde 3 -->
    <!-- 28- L182-183: Gerçekten belirli bir id aralığında sahip olunan tokenlar isteniyor, yoksa adresin sahip olduğu tüm tokenlar mı sorgulanıyor? -->
    <!-- 29- L208: Bu fonksiyon ve L10-14 direkt ERC721Tradable'dan alınmış. Çalışma mantığının açıklanması gerekiyor. (??) -->
    <!-- 30- NFT satışında whitelist satışı yapılacak mı? Satış başlangıç ve bitiş tarihlerini manuel olarak mı değiştireceğiz, yoksa zaman damgaları vasıtasıyla önceden belirleyecek miyiz? -->
    <!-- 31- Eventler eklenecek. -->
README:
    <!-- 1- L2: IPFS mi cloud mu? -->
    <!-- 2- L10: goerli testnet için proxyRegistryAddress adresini bulmamız gerekiyor. (varsa) -->
    3- L9, L14, L18: Bu keyler Dashone'a ait olmalı.
    <!-- 4- L14: Mainnet için farklı, testing için farklı bir cüzdan adresi kullanılmalı. Gerçek varlıklarla ilişkilenen bir cüzdan adresi test için kullanılmamalı. Staging ve integration test esnasında kullanım için birkaç tane test cüzdan adresi de gerekebilir. -->
    <!-- 5- L26: Birbiriyle çakışan paket yoksa çok iyi olur. Gördüğüm kadarıyla yok. Ben ekstra olarak deploy ve test işlemlerini kolaylaştıran hardhat-deploy paketini de yükleyeceğim. -->
    <!-- 6- L32: Yüklenecek yeni paket sayesinde deploy işlemi daha pratik olacaktır. -->
    <!-- 7- L36: Verify işlemini daha kolay ve programlı hale getirmek için bir script yazabilirim. -->
    8- L41: Kontrat ile ilgili işlemleri etherscandan manuel olarak halledebileceğimiz gibi scriptler şeklinde programlayarak da yapabiliriz.
HARDHAT-CONFIG:
    <!-- 1- İhtiyaç doğrultusunda düzenlenecek. -->
DEPLOY:
    <!-- 1- Daha pratik ve esnek bir deploy scripti yüklenecek bir paket ile yazılabilir. -->
PACKAGE:
    <!-- 1- Benim bilmediğim ve muhtemelen beni ilgilendirmeyen çok şey olsa da kontrat geliştirme paketleriyle ilgili gözüme çarpan bir sorun yok gibi. Ekstra olarak hardhat-deploy paketi yüklenecek. -->