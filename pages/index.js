import Head from 'next/head'
import Script from 'next/script'
import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
    <>
    <Head>
  
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>İlkel Benlik</title>
      <link
        rel="shortcut icon"
        href="./assets/img/logo-01.png"
        type="image/x-icon"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <link rel="stylesheet" href="https://use.typekit.net/jwl3vhh.css" />
      <link rel="stylesheet" href="css/index.css" />


    </Head>
    {/*Navbar*/}
    <div className="navbar">
      {/*Navbar-LOGO*/}
      <div className="navbar-logo-box">
        <Link href="/">
          <img src="./assets/img/logo-01.png" alt="" className="header__logo" />
        </Link>
      </div>
      {/*Navbar-Page-Links*/}
      <nav className="navbar-nav">
        <ul className="navbar-list">
          {/* <li class="navbar-item"><a href="#home" class="navbar-link">Home</a></li> */}
          <li className="navbar-item">
            <a href="#about" className="navbar-link">
              Hakkında
            </a>
          </li>
          <li className="navbar-item">
            <a href="#project" className="navbar-link">
              Proje
            </a>
          </li>
          <li className="navbar-item">
            <a href="#roadmap" className="navbar-link">
              Yol Harİtası
            </a>
          </li>
          <li className="navbar-item">
            <a href="#team" className="navbar-link">
              Takım
            </a>
          </li>
          <li className="navbar-item">
            <a href="#faq" className="navbar-link">
              SSS
            </a>
          </li>
          <li className="navbar-item">
            <Link href="/mint" className="navbar-link">
              Mint
            </Link>
          </li>
        </ul>
        {/*Navbar-Social-Links*/}
        <ul className="navbar-list">
          <li className="navbar-item">
            <a href="https://twitter.com/IDseriesNFT" className="navbar-icon">
              <img
                src="./assets/img/logo-twitter.png"
                alt=""
                className="person-info-links-link-icon"
              />
            </a>
          </li>
          <li className="navbar-item">
            <a
              href="https://www.instagram.com/idseries.io/"
              className="navbar-icon"
            >
              <img
                src="./assets/img/logo-instagram.png"
                alt=""
                className="person-info-links-link-icon"
              />
            </a>
          </li>
          <li className="navbar-item">
            <a href="#" className="navbar-icon">
              <img
                src="./assets/img/logo-discord.png"
                alt=""
                className="person-info-links-link-icon"
              />
            </a>
          </li>
          {/* <li class="navbar-item"><a href="#" class="navbar-icon"><img src="./assets/img/logo-opensea.png" alt="" class="person-info-links-link-icon"></a></li> */}
          <li className="navbar-item">
            <Link href="/index-eng" className="navbar-icon">
              <img
                    src="./assets/img/logo-eng.png"
                    alt=""
                    className="person-info-links-link-icon"
                  />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    {/*Navigation Burger*/}
    <div className="navigation">
      {/*Burger*/}
      <div className="navigation-burger">
        <span className="navigation-icon-1">&nbsp;</span>
        <span className="navigation-icon-2">&nbsp;</span>
        <span className="navigation-icon-3">&nbsp;</span>
      </div>
      <div className="navigation-background">&nbsp;</div>
      <nav className="navigation-nav">
        {/*Burger-Links*/}
        <ul className="navigation-list">
          {/* <li class="navigation-item"><a href="#home" class="navigation-link">Home</a></li> */}
          <li className="navigation-item">
            <a href="#about" className="navigation-link">
              Hakkında
            </a>
          </li>
          <li className="navigation-item">
            <a href="#project" className="navigation-link">
              Proje
            </a>
          </li>
          <li className="navigation-item">
            <a href="#roadmap" className="navigation-link">
              Yol Harİtası
            </a>
          </li>
          <li className="navigation-item">
            <a href="#team" className="navigation-link">
              Takım
            </a>
          </li>
          <li className="navigation-item">
            <a href="#faq" className="navigation-link">
              SSS
            </a>
          </li>
          <li className="navigation-item">
            <Link href="/mint" className="navigation-link">
                Mint
              </Link>
          </li>
          {/*Burger-Social-Links*/}
          <ul className="footer-list">
            <li className="footer-item">
              <a href="https://twitter.com/IDseriesNFT" className="footer-icon">
                <img
                  src="./assets/img/logo-twitter.png"
                  alt=""
                  className="person-info-links-link-icon"
                />
              </a>
            </li>
            <li className="footer-item">
              <a
                href="https://www.instagram.com/idseries.io/"
                className="footer-icon"
              >
                <img
                  src="./assets/img/logo-instagram.png"
                  alt=""
                  className="person-info-links-link-icon"
                />
              </a>
            </li>
            <li className="footer-item">
              <a href="#" className="footer-icon">
                <img
                  src="./assets/img/logo-discord.png"
                  alt=""
                  className="person-info-links-link-icon"
                />
              </a>
            </li>
            {/* <li class="footer-item"><a href="#ß" class="footer-icon"><img src="./assets/img/logo-opensea.png" alt="" class="person-info-links-link-icon"></a></li> */}
            <li className="footer-item">
              <Link href="/index-eng" className="navbar-icon">
                <img
                      src="./assets/img/logo-eng.png"
                      alt=""
                      className="person-info-links-link-icon"
                    />
              </Link>
            </li>
          </ul>
        </ul>
      </nav>
    </div>
    {/*Header*/}
    <header className="header" id="home">
      <div className="header__logo-box">
        <img src="./assets/img/logo-01.png" alt="" className="header__logo" />
      </div>
      <div className="header__text-box">
        <a
          href="https://www.youtube.com/watch?v=uQzbvEpa2Xs"
          className="btn btn-transparent btn-animated"
        >
          Full Video
        </a>
      </div>
    </header>
    {/*About*/}
    <section className="section-about" id="about">
      <div className="u-center-text u-margin-bottom-big">
        {/*About-Header*/}
        <h2 className="heading-secondary ">PROJENİN AMACI</h2>
      </div>
      <div className="row">
        {/*About-Photo*/}
        <div className="col-1-of-2">
          <div className="composition">
            {/* <img src="./assets/img/necmi-gürseler-foto.jpeg" alt="Photo 3" class="composition__photo composition__photo--p3"> */}
          </div>
        </div>
        {/*About-Info*/}
        <div className="col-1-of-2">
          <div className="info-box">
            <p className="paragraph info-box-p">
              Necmi Gürseler ülke çapında bilinen ve bir çok koleksiyonerin
              koleksiyonunda yer alan bir ressamdır. Gelişen teknolojik trendler
              ve yaptığı resimlerin hikayesi onu fiziksel ve dijitalin bir arada
              olabileceği bir düşünceye sürüklemekte ve yaratıcılığı çok farklı
              boyutlara taşımaktadır.{" "}
            </p>
          </div>
          <br />
          <br />
          <div className="btn-cont">
            <a
              href="#about"
              className="btn btn-color-primary btn-animated btn-popup"
            >
              DETAYLAR
            </a>
          </div>
        </div>
      </div>
      {/*About-Popup*/}
      <div className="popup">
        <div className="popup-card">
          <a>
            <i className="fas fa-times close-btn" />
          </a>
          <div className="popup-info">
            <h2 className="heading-tertiary">PROJENİN AMACI NEDİR?</h2>
            <p className="paragraph paragraph-small">
              Necmi Gürseler ülke çapında bilinen ve bir çok koleksiyonerin
              koleksiyonunda yer alan bir ressamdır. Gelişen teknolojik trendler
              ve yaptığı resimlerin hikayesi onu fiziksel ve dijitalin bir arada
              olabileceği bir düşünceye sürüklemekte ve yaratıcılığı çok farklı
              boyutlara taşımaktadır.Bu Sebeple : <br />
              1. “İlkel Benlik / ID Series “ serisiyle resmettiği hikayenin
              karakterinin hayat bulması ve Necmi Gürseler’in yaratıcı dünyasına
              tüm sevenlerinin de ortak etmektir. <br />
              2. Teknolojiyi de yanına alarak yaratıcılık ve hayal gücünün sonsuza
              taşınmasına tanıklık etmektedir. <br />
              3. Fiziksel olarak eserlere erişemeyen , yada fiziksel eser
              deneyiminden uzak kalmayı tercih eden sevenlere dijital olarak ta bu
              yaratıcı dünyayı sunmak ve bunu sadece ulusal değil aynı zamanda
              uluslararası sanat dünyasında yaygınlaştırmaktır. <br />
              4. Sanatçının ulaşılmaz / erişilmez bir kişilik olması algısını
              kırmak , severler ile doğrudan etkileşimde olmak , onlardan katkı
              almanın yanı sıra onlara da kazanımlarda bulundurmaktır. <br />
              5. “ Sanat hayal edince ve paylaşınca daha güzel “ sloganı da
              projenin amacını daha net ortaya koymaktadır.{" "}
            </p>
            <p />
          </div>
        </div>
      </div>
    </section>
    {/*ProjectVision*/}
    <section className="section-vision" id="project">
      {/*ProjectVision-Header*/}
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary header-white">İLKEL BENLİK</h2>
      </div>
      <div className="row">
        {/*ProjectVision-Photo*/}
        <div className="col-1-of-2">
          {/* <div class="gif">
      <img src="./assets/img/black-bg-3.png" alt="Gif 1" class="gif__photo">
    </div> */}
        </div>
        {/*ProjectVision-Info*/}
        <div className="col-1-of-2">
          <div className="vision-box">
            <h3 className="heading-tertiary u-margin-bottom-small header-white">
              İLKEL BENLİK NEDİR?
            </h3>
            <p className="paragraph paragraph-white ">
              İnsan tarihsel midir, evrensel midir? Kişi yaşamını sürdürdüğü
              dönemde edindiği deneyimlerden mi ibarettir, yoksa genetik kodlarına
              işlenmiş, birikmiş bir geçmişle ve değişmez özellikteki bir tözle mi
              doğar? Necmi Gürseler’in bu sorulara resimleriyle verdiği yanıtlar,
              ruhsal bir öz arayışında olduğunu gösterir. Bu öz, “ilkel
              benlik”tir. Göreceliliği, ruhsal evrimi kabul etmekle birlikte,
              onlara bir sınır çekmek ister, post/modern insanın inşa edilmiş
              psikolojisinin izlerini premodern dönemden itibaren sökmeye çalışır.
            </p>
            {/* <h3 class="heading-tertiary u-margin-bottom-small header-white">PROJENİN AMACI</h3>
      <p class="paragraph paragraph-white">
        “İlkel Benlik“ serisiyle resmettiği hikayenin karakterinin hayat bulması ve
        Necmi Gürseler’in yaratıcı dünyasına tüm sevenlerinin de ortak etmektir.
        Teknolojiyi de yanına alarak yaratıcılık ve hayal gücünün sonsuza taşınmasına tanıklık
        etmektedir.   
      </p> */}
          </div>
          <br />
          <br />
          <div className="btn-cont">
            <a href="#project" className="btn btn-white btn-animated btn-popup">
              Detaylar
            </a>
          </div>
        </div>
      </div>
      {/*ProjectVision-Popup*/}
      <div className="popup">
        <div className="popup-card">
          <a>
            <i className="fas fa-times close-btn" />
          </a>
          <div className="popup-info">
            <h2 className="heading-tertiary">İlkel Benlİk Nedİr?</h2>
            <p className="paragraph paragraph-small">
              İnsan tarihsel midir, evrensel midir? Kişi yaşamını sürdürdüğü
              dönemde edindiği deneyimlerden mi ibarettir, yoksa genetik kodlarına
              işlenmiş, birikmiş bir geçmişle ve değişmez özellikteki bir tözle mi
              doğar? Necmi Gürseler’in bu sorulara resimleriyle verdiği yanıtlar,
              ruhsal bir öz arayışında olduğunu gösterir. Bu öz, “ilkel
              benlik”tir. Göreceliliği, ruhsal evrimi kabul etmekle birlikte,
              onlara bir sınır çekmek ister, post/modern insanın inşa edilmiş
              psikolojisinin izlerini premodern dönemden itibaren sökmeye çalışır.
              Gürseler için modern ve postmodern dönemin yapay inşaları
              kaldırıldığında geriye kalan, insanın sahip olduğu tözün, evrensel
              kökenleridir. Ona göre kişisel deneyimler ne kadar dönüştürürse
              dönüştürsün, post/modernleşme ne kadar örterse örtsün, insanın
              rasyonaliteye direnen, yalnızca mitolojik anlatılarla ifade
              edilebilecek, kendi bilincinden bağımsız ve tüm insanlıkla ortak bir
              bilinçdışı vardır. Bu kolektif bilinçdışı kişinin hangi tarih ve
              coğrafyada bulunduğundan etkilenmeksizin tüm kararlarının üzerine
              yansır. Gürseler için tehlikeli olan, köklerdeki kolektif
              bilinçdışının zemini olan ilkel benliğin önce modernite, ardından
              postmodernite tarafından iz bırakılmayacak denli
              ehlileştirilmesidir. Kurmaca gördüğü kültürel olanın, asli/doğal
              gördüğü ilkel olanı yutmasının karşısına dikilir: Yapay’dan Öz’e
              dönülmelidir. <br /> <br />
              Fakat nedir öz? Kolektif bilinçdışı görünmez, ele avuca gelmez,
              tarif edilmez. O bir hissiyat. Gürseler, kolektif bilinçdışının ne
              olduğuna değil, görülebilseydi, nasıl bir görüntüsü olacağına
              odaklanır. Öz’ün yani ilkel benliğin hissiyatı, ancak simgeler
              aracılığıyla yeniden üretilebilir ve bu üretilen ortak bir anlama
              uzanabilir. Gürseler, anlatısını ortak bir anlam üretecek şekilde
              betimleyebilmek için bazı tanıdık görsellere dayanmak zorundadır.
              İlkel benlik için en uygun görseller olarak mitolojik göstergeleri
              seçer. Böylece Gürseler’in resimlerini mitolojiyi yeniden
              keşfeden/üreten öyküler, bu öyküleri canlandıran figürler ve o
              figürlerin taşıyıcılığındaki anlam ağları düzenler. Bu anlam ağları
              yaydıkları mana konusunda kesinlik arz eden im’ler değil,
              yorumlanabilirlikleri sonsuza uzanan simgelerdir. Hiçbir görsel
              kendi görevinde değildir, tümü gösterdiklerini aşan anlam
              olanaklarıyla donatılmıştır. Bu bir arketipler geçidi, tuvalden
              insanın içine bir yolculuk, her insanın kendi kişisel deneyimleriyle
              farklı yönlerini açığa çıkarabildiği, içinde daha önce öz-keşfe
              uğramamış derinlere inme rehberi; bir kolektif bilinç dışı
              arkeolojik kazısı. <br /> <br />
              Bu resimler, araştırma alanı gereği bilinçle değil, bilinç dışıyla
              boyanırlar. Ne bir eskiz, ne bir kurgu, Gürseler tuvalin başına
              oturur ve çizgi egemenliğindeki anlatısını bir çırpıda oluşturur.
              Kolektif bilinç dışını, kendi bilinç dışının kolektif olanla kurduğu
              bilinç dışı ilişkilerle resmeder. Gürseler’in resimleri, bilinç
              dışılar arası ilişkidir. <br /> <br />
              Yalın Alpay
            </p>
          </div>
        </div>
      </div>
    </section>
    {/*Roadmap*/}
    <section className="section-roadmap" id="roadmap">
      <div className="u-center-text u-margin-bottom-medium">
        <h2 className="heading-secondary ">Yol Harİtası</h2>
      </div>
      <div className="row">
        <div className="stone">
          <figure className="stone-shape">
            <img src="./assets/img/banner1.png" alt="" className="stone-gif" />
          </figure>
          <div className="stone-text">
            <h3 className="heading-tertiary u-margin-bottom-small header-black">
              VAROLUŞ
            </h3>
            <p className="paragraph paragraph-small">
              ID Series NFT‘lerin hazırlanması. Sosyal medya kanalları ve website
              lansmanı.
            </p>
          </div>
          <div className="stone-detail">
            <div className="paragraph paragraph-small">
              1. ID Series NFT ‘lerin hazırlanması <br />
              2. Sosyal medya kanallarının lansmanı <br />
              3. Web Sitesi Lansmanı <br />
              4. Projenin Keşfi ve Aktiviteler <br />
              4.1. Youtube - Necmi Gürseler Belgeseli <br />
              4.2. Discord - Necmi Gürseler ile Fun Art Yarışması <br />
              4.3. Instagram - Necmi Gürseler ile sohbet <br />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="stone">
          <figure className="stone-shape">
            <img src="./assets/img/banner2.png" alt="" className="stone-gif" />
          </figure>
          <div className="stone-text">
            <h3 className="heading-tertiary u-margin-bottom-small header-black">
              MİNTİNG
            </h3>
            <p className="paragraph paragraph-small">
              1976 adet özel tasarım NFT'nin özel ve genel satışları.
            </p>
          </div>
          <div className="stone-detail">
            <div className="paragraph paragraph-small">
              1. 1976 adet ID Series NFT‘nin satışa çıkarılması <br />
              2. Magic Eden Market Place‘de Lansman Yapılması <br />
              3. Özel (Private) ve Genel (Public) Satış <br />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="stone">
          <figure className="stone-shape">
            <img src="./assets/img/d1.png" alt="" className="stone-gif" />
          </figure>
          <div className="stone-text">
            <h3 className="heading-tertiary u-margin-bottom-small header-black">
              İLKEL BENLİK DAO'SUNUN KURULMASI
            </h3>
            <p className="paragraph paragraph-small">
              İlkel Benlik DAO‘su NFT sahipleri tarafından yönlendirilecek sanat
              yatırım platformu olacaktır.
            </p>
          </div>
          <div className="stone-detail">
            <div className="paragraph paragraph-small">
              1. Kurulacak olan İlkel Benlik DAO ‘su NFT sahipleri tarafından
              yönlendirilecek bir sanat yatırımcı olarak işlev görecektir. <br />
              2. Gelir modeli ve kaynakları : <br />
              2.1. Mint gelirinin %10’u ilkel Benlik DAO’suna aktarılacak <br />
              2.2. Royalty Fee ‘nin %2 ‘si İlkel Benlik DAO’suna aktarılacak{" "}
              <br />
              2.3. Necmi Gürseler Sanal Sanat Galerisinden yapılacak Digital eser
              satışlarının %10’u İlkel Benlik DAO’suna aktarılacak <br />
              2.4. Necmi Gürseler Sanal Sanat Galerisinin kiralama gelirlerinin
              %50 ‘si İlkel Benlik DAOao’suna aktarılacak <br />
              2.5. Necmi Gürseler Sanal Sanat Galerisinde yapılacak müzayedelerden
              DAO’ya aktarım.
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="stone">
          <figure className="stone-shape">
            <img src="./assets/img/d6.png" alt="" className="stone-gif" />
          </figure>
          <div className="stone-text">
            <h3 className="heading-tertiary u-margin-bottom-small header-black">
              İLKEL BENLİK SANAL EVRENİNİN KURULMASI
            </h3>
            <p className="paragraph paragraph-small">
              NFT sahiplerinin hissedarı olacakları bir sanal evren ve atölyeler
              kurulacaktır.
            </p>
          </div>
          <div className="stone-detail">
            <div className="paragraph paragraph-small">
              1. Karakter sahibine İlkel Benlik Dünyasından Hisse <br />
              1.1. İlkel Benlik dünyası , şu an için Necmi Gürseler’in atölyesinin
              ve galerisinin olduğu ve yeni üyelerini sabırsızlıkla beklediği bir
              sanal evrendir. <br />
              2. Sanal Evrende Necmi Gürseler Sanat Galerisinin Kurulması <br />
              2.1. Necmi Gürseler’in fiziksel sergileri öncesi özel lansmaların
              buradan yapılması <br />
              3. Sanal Evrende Necmi Gürseler Atölyesinin Kurulması <br />
              3.1. Necmi Gürseler atölyesinin sadece Necmi Gürseler’in
              yaratıcılığını sergilediği bir alan değil , tüm paydaşların üretmek
              üzere kullanabileceği bir üretim merkezi olması hedeflenmektedir{" "}
              <br />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="stone">
          <figure className="stone-shape">
            <img src="./assets/img/d3.png" alt="" className="stone-gif" />
          </figure>
          <div className="stone-text">
            <h3 className="heading-tertiary u-margin-bottom-small header-black">
              GERÇEK DÜNYA ETKİNLİKLERİ
            </h3>
            <p className="paragraph paragraph-small">
              Necmi Gürseler eserleri için indirimler. Sergilere ücretsiz
              girişler.
            </p>
          </div>
          <div className="stone-detail">
            <div className="paragraph paragraph-small">
              1. Bu proje kapsamında elde edilen gelirin %1’i topluluk tarafından
              belirlenecek STK ile paylaşılacaktır. <br />
              2. Karakter sahipleri fiziksel olarak bir Necmi Gürseler eseri almak
              istediklerinde onlara atanacak bir indirim kodu ile piyasa
              koşullarından çok daha avantajlı eser alma hakkına sahip olacaktır.{" "}
              <br />
              3. Yapılacak Necmi Gürseler sergilerine ücretsiz giriş ve İlkel
              Benlik Sanal Evreninde yapılacak olan özel lansmanlara giriş hakkına
              sahip olacaktır.
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="stone">
          <figure className="stone-shape">
            <img src="./assets/img/d4.png" alt="" className="stone-gif" />
          </figure>
          <div className="stone-text">
            <h3 className="heading-tertiary u-margin-bottom-small header-black">
              İLKEL BENLİK TOKEN (ID Token)
            </h3>
            <p className="paragraph paragraph-small">
              ID Token sanat dünyasının yeni nesil Token'i.
            </p>
          </div>
          <div className="stone-detail">
            <div className="paragraph paragraph-small"></div>
          </div>
        </div>
      </div>
    </section>
    {/*Team*/}
    <section className="section-team" id="team">
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary header-white">Takım</h2>
      </div>
      <div className="row">
        <div className="col-1-of-4">
          <div className="person">
            <figure className="person-shape">
              <img
                src="./assets/img/necmi-gürseler-foto.jpeg"
                alt=""
                className="person-image"
              />
            </figure>
            <div className="person-info">
              <h3 className="heading-tertiary u-margin-bottom-small header-white">
                NECMİ GÜRSELER
              </h3>
              <p className="paragraph paragraph-small paragraph-white">Artist</p>
              <div className="person-info-links">
                {/* <a href="#" class="person-info-links-link"><img src="./assets/img/logo-twitter.png" alt="" class="person-info-links-link-icon"></a> */}
                <a
                  href="https://www.instagram.com/necmigurseler/"
                  className="person-info-links-link"
                >
                  <img
                    src="./assets/img/logo-instagram.png"
                    alt=""
                    className="person-info-links-link-icon"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1-of-4">
          <div className="person">
            <figure className="person-shape">
              <img src="./assets/img/tuba.jpeg" alt="" className="person-image" />
            </figure>
            <div className="person-info">
              <h3 className="heading-tertiary u-margin-bottom-small header-white">
                TUBA ATASOY
              </h3>
              <p className="paragraph paragraph-small paragraph-white">
                Art Consultant
              </p>
              <div className="person-info-links">
                {/* <a href="#" class="person-info-links-link"><img src="./assets/img/logo-twitter.png" alt="" class="person-info-links-link-icon"></a> */}
                <a
                  href="https://www.instagram.com/tubatasoy/"
                  className="person-info-links-link"
                >
                  <img
                    src="./assets/img/logo-instagram.png"
                    alt=""
                    className="person-info-links-link-icon"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1-of-4">
          <div className="person">
            <figure className="person-shape">
              <img
                src="./assets/img/nuri-cömert.jpeg"
                alt=""
                className="person-image"
              />
            </figure>
            <div className="person-info">
              <h3 className="heading-tertiary u-margin-bottom-small header-white">
                CEM NURİ CÖMERT
              </h3>
              <p className="paragraph paragraph-small paragraph-white">
                CTO &amp; Co-Founder
              </p>
              <div className="person-info-links">
                <a
                  href="https://www.linkedin.com/in/nuricomert"
                  className="person-info-links-link"
                >
                  <img
                    src="./assets/img/logo-linkedin.png"
                    alt=""
                    className="person-info-links-link-icon"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1-of-4">
          <div className="person">
            <figure className="person-shape">
              <img
                src="./assets/img/ozge-varis.png"
                alt=""
                className="person-image"
              />
            </figure>
            <div className="person-info">
              <h3 className="heading-tertiary u-margin-bottom-small paragraph-white">
                ÖZGE VARIŞ
              </h3>
              <p className="paragraph paragraph-small paragraph-white">
                Co-Founder
              </p>
              <div className="person-info-links">
                <a
                  href="https://www.linkedin.com/in/ozge-kilic-varis-a1332a19"
                  className="person-info-links-link"
                >
                  <img
                    src="./assets/img/logo-linkedin.png"
                    alt=""
                    className="person-info-links-link-icon"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1-of-4">
          <div className="person">
            <figure className="person-shape">
              <img src="./assets/img/alim.jpg" alt="" className="person-image" />
            </figure>
            <div className="person-info">
              <h3 className="heading-tertiary u-margin-bottom-small header-white">
                Ali Veli
              </h3>
              <p className="paragraph paragraph-small paragraph-white">CMO</p>
              <div className="person-info-links">
                <a href="#" className="person-info-links-link">
                  <img
                    src="./assets/img/logo-instagram.png"
                    alt=""
                    className="person-info-links-link-icon"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1-of-4">
          <div className="person">
            <figure className="person-shape">
              <img src="./assets/img/alim.jpg" alt="" className="person-image" />
            </figure>
            <div className="person-info">
              <h3 className="heading-tertiary u-margin-bottom-small header-white">
                ALİM GEYİK
              </h3>
              <p className="paragraph paragraph-small paragraph-white">
                Blockchain Developer
              </p>
              <div className="person-info-links">
                <a
                  href="https://twitter.com/alimgeyik027"
                  className="person-info-links-link"
                >
                  <img
                    src="./assets/img/logo-twitter.png"
                    alt=""
                    className="person-info-links-link-icon"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1-of-4">
          <div className="person">
            <figure className="person-shape">
              <img
                src="./assets/img/oguzhan.jpeg"
                alt=""
                className="person-image"
              />
            </figure>
            <div className="person-info">
              <h3 className="heading-tertiary u-margin-bottom-small header-white">
                OĞUZHAN ÇETİN
              </h3>
              <p className="paragraph paragraph-small paragraph-white">
                Dijital Art Consultant
              </p>
              <div className="person-info-links">
                {/* <a href="#" class="person-info-links-link"><img src="./assets/img/logo-twitter.png" alt="" class="person-info-links-link-icon"></a> */}
                <a
                  href="https://theozien.artstation.com/"
                  className="person-info-links-link"
                >
                  <img
                    src="./assets/img/logo-artstation.png"
                    alt=""
                    className="person-info-links-link-icon"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <div class="col-1-of-4">
    <div class="person">
      <figure class="person-shape">
        <img src="./assets/img/alim.jpg" alt="" class="person-image">
      </figure>
      <div class="person-info">
        <h3 class="heading-tertiary u-margin-bottom-small header-white">Ali Veli</h3>
        <p class="paragraph paragraph-small paragraph-white">Title</p>
        <div class="person-info-links">
          <a href="#" class="person-info-links-link"><img src="./assets/img/logo-twitter.png" alt="" class="person-info-links-link-icon"></a>
          <a href="#" class="person-info-links-link"><img src="./assets/img/logo-instagram.png" alt="" class="person-info-links-link-icon"></a>
        </div>
      </div>
    </div>
  </div> */}
      </div>
    </section>
    {/*FAQ*/}
    <section className="section-faq" id="faq">
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary header-black">SSS</h2>
      </div>
      <div className="row">
        <div className="questions">
          <div className="questions-question-text">
            <h3 className="heading-tertiary u-margin-bottom-small header-black">
              NECMİ GÜRSELER KİMDİR?
            </h3>
          </div>
          <div className="questions-answer-text">
            <p className="paragraph  paragraph-small">
              Necmi Gürseler 1976 yılında İstanbul’da doğdu. 2001-2005 yılları
              arasında Anadolu Üniversitesi güzel sanatlar fakültesi resim bölümü
              Halil Akdeniz Atölyesi’nde eğitim gördü. 2005-2009 Atölye Mart’ta
              resim eğitmenliği yapan sanatçının, 2009 ve 2013 yılları arasında da
              Gerçek Gazetesi’nde köşe yazıları yayınlanmıştır. Sanatçı
              İstanbul’daki atölyesinde çalışmalarına devam etmektedir.
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="questions">
          <div className="questions-question-text">
            <h3 className="heading-tertiary u-margin-bottom-small header-black">
              İLKEL BENLİK SERİSİ NEDİR?
            </h3>
          </div>
          <div className="questions-answer-text">
            <p className="paragraph paragraph-small">
              İnsan tarihsel midir, evrensel midir? Kişi yaşamını sürdürdüğü
              dönemde edindiği deneyimlerden mi ibarettir, yoksa genetik kodlarına
              işlenmiş, birikmiş bir geçmişle ve değişmez özellikteki bir tözle mi
              doğar? Necmi Gürseler’in bu sorulara resimleriyle verdiği yanıtlar,
              ruhsal bir öz arayışında olduğunu gösterir. Bu öz, “ilkel
              benlik”tir.
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="questions">
          <div className="questions-question-text">
            <h3 className="heading-tertiary u-margin-bottom-small header-black">
              PROJENİN AMACI NEDİR?
            </h3>
          </div>
          <div className="questions-answer-text">
            <p className="paragraph paragraph-small">
              Necmi Gürseler ülke çapında bilinen ve bir çok koleksiyonerin
              koleksiyonunda yer alan bir ressamdır. Gelişen teknolojik trendler
              ve yaptığı resimlerin hikayesi onu fiziksel ve dijitalin bir arada
              olabileceği bir düşünceye sürüklemekte ve yaratıcılığı çok farklı
              boyutlara taşımaktadır.Bu Sebeple : <br />
              1. “İlkel Benlik / ID Series “ serisiyle resmettiği hikayenin
              karakterinin hayat bulması ve Necmi Gürseler’in yaratıcı dünyasına
              tüm sevenlerinin de ortak etmektir. <br />
              2. Teknolojiyi de yanına alarak yaratıcılık ve hayal gücünün sonsuza
              taşınmasına tanıklık etmektedir. <br />
              3. Fiziksel olarak eserlere erişemeyen , yada fiziksel eser
              deneyiminden uzak kalmayı tercih eden sevenlere dijital olarak ta bu
              yaratıcı dünyayı sunmak ve bunu sadece ulusal değil aynı zamanda
              uluslararası sanat dünyasında yaygınlaştırmaktır. <br />
              4. Sanatçının ulaşılmaz / erişilmez bir kişilik olması algısını
              kırmak , severler ile doğrudan etkileşimde olmak , onlardan katkı
              almanın yanı sıra onlara da kazanımlarda bulundurmaktır. <br />
              5. “ Sanat hayal edince ve paylaşınca daha güzel “ sloganı da
              projenin amacını daha net ortaya koymaktadır.{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="questions">
          <div className="questions-question-text">
            <h3 className="heading-tertiary u-margin-bottom-small header-black">
              İLKEL BENLİK SERİSİ KOLEKSİYONUNUN DEĞERLİLİK DAĞILIMI NASILDIR?
            </h3>
          </div>
          <div className="questions-answer-text">
            <p className="paragraph paragraph-small">
              İlkel Benlik / ID series koleksiyonu , Necmi Gürseler tarafından el
              ile çizilmiş 1976 adet İlkel Benlik / ID Series hikayesini oluşturan
              karakterlerden oluşmaktadır. <br />
              Nadirlik durumlarına göre eser sayıları: <br />
              Mystic - 4 <br />
              Supreme - 44 <br />
              Ultra Rare - 128 <br />
              Rare - 400 <br />
              Uncommon - 500 <br />
              Common - 900 <br />
              Toplam - 1976
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="questions">
          <div className="questions-question-text">
            <h3 className="heading-tertiary u-margin-bottom-small header-black">
              NE ZAMAN SATIŞA ÇIKACAK?
            </h3>
          </div>
          <div className="questions-answer-text">
            <p className="paragraph paragraph-small">
              Satışa çıkış tarihi henüz belirlenmemiştir. Tarih belirlendikten
              sonra ayrıca duyurusu yapılacaktır.
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="questions">
          <div className="questions-question-text">
            <h3 className="heading-tertiary u-margin-bottom-small header-black">
              İLKEL BENLİK SERİSİ BİR ESERE NASIL SAHİP OLABİLİRİM?
            </h3>
          </div>
          <div className="questions-answer-text">
            <p className="paragraph paragraph-small">
              Solana ağı üzerinden satışa sunulacak olan İlkel Benlik Serisi web
              sitemiz üzerinden mint edilecektir. Minting aşamasını kaçırdıysanız
              üzülmeyin çünkü bu aşamasının ardından Magic Eden üzerinden İlkel
              Benlik Serisine ait eserlere ulaşabileceksiniz.
            </p>
          </div>
        </div>
      </div>
    </section>
    {/*Footer*/}
    <footer className="footer">
      <div className="footer-logo-box">
        <a href="#home">
          <img src="./assets/img/logo-1.png" alt="" className="footer-logo" />
        </a>
      </div>
      <div className="row">
        <p className="footer-copyright paragraph-white">
          Copyright © 2022,{" "}
          <a href="#" className="footer-link">
            DASHONE TECH.
          </a>{" "}
          All Rights Reserved.
        </p>
      </div>
    </footer>

    <Script src="./js/burger.js"></Script>
    <Script src="./js/stone.js"></Script>
    <Script src="./js/popup.js"></Script>
    <Script src="./js/faq.js"></Script>
    <Script src="./js/vanilla-tilt.js"></Script>
    {/* <Script>
      VanillaTilt.init(document.querySelectorAll(".person"), {
      max: 25,
      speed: 400
    });
    VanillaTilt.init(document.querySelectorAll(".stone"), {
      max: 25,
      speed: 400
    });
    </Script> */}
</>

  )
}
