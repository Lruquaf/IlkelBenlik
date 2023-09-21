import Head from 'next/head'
import Script from 'next/script'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function ENGHome() {
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
        <a href="#home">
            <img src="./assets/img/logo-01.png" alt="" className="header__logo" />
        </a>
        </div>
        {/*Navbar-Page-Links*/}
        <nav className="navbar-nav">
        <ul className="navbar-list">
            {/* <li class="navbar-item"><a href="#home" class="navbar-link">Home</a></li> */}
            <li className="navbar-item">
            <a href="#about" className="navbar-link">
                ABOUT
            </a>
            </li>
            <li className="navbar-item">
            <a href="#project" className="navbar-link">
                PROJECT
            </a>
            </li>
            <li className="navbar-item">
            <a href="#roadmap" className="navbar-link">
                ROADMAP
            </a>
            </li>
            <li className="navbar-item">
            <a href="#team" className="navbar-link">
                TEAM
            </a>
            </li>
            <li className="navbar-item">
            <a href="#faq" className="navbar-link">
                FAQ
            </a>
            </li>
            <li className="navbar-item">
            <Link href="./mint-eng" className="navbar-link">
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
                className="navbar-icon">
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
                <Link href="/" className="navbar-icon">
                    <img
                        src="./assets/img/logo-tr.png"
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
                ABOUT
            </a>
            </li>
            <li className="navigation-item">
            <a href="#project" className="navigation-link">
                PROJECT
            </a>
            </li>
            <li className="navigation-item">
            <a href="#roadmap" className="navigation-link">
                ROADMAP
            </a>
            </li>
            <li className="navigation-item">
            <a href="#team" className="navigation-link">
                TEAM
            </a>
            </li>
            <li className="navigation-item">
            <a href="#faq" className="navigation-link">
                FAQ
            </a>
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
                <a href="index.html" className="footer-icon">
                <img
                    src="./assets/img/logo-tr.png"
                    alt=""
                    className="person-info-links-link-icon"
                />
                </a>
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
        <h2 className="heading-secondary ">THE PURPOSE</h2>
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
                Necmi Gürseler is a painter artist known throughout the country and
                his works are included in the collections of many collectors.
                Developing technological trends and the story of his paintings lead
                him to the idea that physical and digital can coexist, and carries
                creativity to many different dimensions.{" "}
            </p>
            </div>
            <br />
            <br />
            <div className="btn-cont">
            <a
                href="#about"
                className="btn btn-color-primary btn-animated btn-popup"
            >
                DETAILS
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
            <h2 className="heading-tertiary">
                WHAT IS THE PURPOSE OF THE PROJECT?
            </h2>
            <p className="paragraph paragraph-small">
                Necmi Gürseler is a painter artist known throughout the country and
                his works are included in the collections of many collectors.
                Developing technological trends and the story of his paintings lead
                him to the idea that physical and digital can coexist, and carries
                creativity to many different dimensions. For these reasons, the
                purpose of the project can be summarized as : <br />
                1. It is to bring the character of the story he portrayed with the
                "ID Series" to life and to share the creative world of Necmi
                Gürseler with all his fans. <br />
                2. By taking technology with it, the infinity of creativity and
                imagination is witnessed. <br />
                3. To present this creative world digitally to those who cannot
                physically access the works, or who prefer to stay away from the
                physical work experience, and to spread this not only in the
                national but also in the international art community. <br />
                4. To break the perception that the artist is an inaccessible /
                inaccessible personality, to interact directly with their fans, to
                receive contributions from them as well as to have them gain
                benefits. <br />
                5. The slogan “Art is more beautiful when it is imagined and shared”
                also reveals the purpose of the project more clearly.
            </p>
            </div>
        </div>
        </div>
    </section>
    {/*ProjectVision*/}
    <section className="section-vision" id="project">
        {/*ProjectVision-Header*/}
        <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary header-white">ID</h2>
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
                WHAT IS ID?
            </h3>
            <p className="paragraph paragraph-white ">
                Is man historical or universal? Do someone is formed of the
                experiences he has gained during his life, or is he born with an
                accumulated past and an unchanging substance that has been engraved
                in his genetic codes? Necmi Gürseler's answers to these questions
                with his paintings show that he is in search of a spiritual self.
                This essence is the "ID". While accepting relativity and spiritual
                evolution, as he wants to draw a limit to them, he tries to remove
                the traces of the post/modern human's built psychology from the
                pre-modern period.
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
                DETAILS
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
            <h2 className="heading-tertiary"> WHAT IS ID?</h2>
            <p className="paragraph paragraph-small">
                Does someone is formed of the experiences he has gained during his
                life, or is he born with an accumulated past and an unchanging
                substance that has been engraved in his genetic codes? Necmi
                Gürseler's answers to these questions with his paintings show that
                he is in search of a spiritual self. This essence is the "ID". While
                accepting relativity and spiritual evolution, as he wants to draw a
                limit to them, he tries to remove the traces of the post/modern
                human's built psychology from the pre-modern period. For Gürseler,
                when the artificial constructions of the modern and post-modern era
                are removed, what remains is the universal origins of the substance
                of human beings. According to him, no matter how much personal
                experiences transform, no matter how much post/modernization covers,
                man has an unconsciousness that resists rationality, can only be
                expressed through mythological narratives, independent of his own
                consciousness and common with all humanity. This collective
                unconsciousness is reflected on all decisions of the person,
                regardless of the date and geography. What is dangerous for Gürseler
                is that the Id, which is the ground of the collective unconscious in
                the roots, is tamed by first modernity and then by post-modernity.
                Fiction opposes the cultural swallowing of what it sees as
                essential/natural, the primitive: One must turn from the Artificial
                to his Essence. <br /> <br />
                But what is essence? The collective unconscious is invisible,
                intangible, undefinable. It's a feeling. Gürseler does not focus on
                what the collective unconscious is, but what it would look like if
                it could be seen. The feeling of the Essence, that is, the primitive
                self, can only be reproduced through symbols and this produced can
                reach a common meaning. Gürseler has to rely on some familiar
                visuals in order to describe his narrative in a way that produces a
                common meaning, as he selects mythological signs as the most
                suitable images for the Id. Therefore, Gürseler's paintings organize
                the stories that rediscover/produce mythology, the figures that
                enliven these stories, and the networks of meanings that bear those
                figures. These networks of meaning are not signs that are certain
                about the meaning they spread, but symbols whose interpretability
                extends to infinity. No image is in its own task, all of them are
                equipped with meaning possibilities that exceed what they show. It's
                a portal of archetypes, a journey from the canvas to the inside of
                the human, a guide to delving into the previously undiscovered
                depths in which each person can reveal their different aspects
                through their own personal experiences; an archaeological excavation
                of the collective unconscious. <br /> <br />
                These paintings are not painted with consciousness, but with the
                unconscious, due to the field of research. Neither a sketch nor a
                fiction, Gürseler sits on the canvas and creates his line-dominated
                narrative in one fell swoop. He portrays the collective unconscious
                with its unconscious relations with the collective. Gürseler's
                paintings are a relationship between the unconscious. <br /> <br />
                Yalın Alpay
            </p>
            </div>
        </div>
        </div>
    </section>
    {/*Roadmap*/}
    <section className="section-roadmap" id="roadmap">
        <div className="u-center-text u-margin-bottom-medium">
        <h2 className="heading-secondary header-black">ROADMAP</h2>
        </div>
        <div className="row">
        <div className="stone">
            <figure className="stone-shape">
            <img src="./assets/img/banner1.png" alt="" className="stone-gif" />
            </figure>
            <div className="stone-text">
            <h3 className="heading-tertiary u-margin-bottom-small header-black">
                EXISTENCE
            </h3>
            <p className="paragraph paragraph-small">
                Preparation of ID Series NFTs. Social media channels and website
                launch.
            </p>
            </div>
            <div className="stone-detail">
            <div className="paragraph paragraph-small">
                1. Preparation of ID Series NFTs <br />
                2. Launch of project social media channels
                <br />
                3. Website Launch
                <br />
                4. Project Discovery and Activities
                <br />
                4.1. Youtube - Necmi Gürseler Documentary <br />
                4.2. Discord - Fun Art Contest with Necmi Gürseler
                <br />
                4.3. Instagram - Chat with Necmi Gürseler
                <br />
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
                Minting
            </h3>
            <p className="paragraph paragraph-small">
                Private and public sales of 1976 custom-designed NFTs.
            </p>
            </div>
            <div className="stone-detail">
            <div className="paragraph paragraph-small">
                1. Sale of 1976 ID Series NFTs <br />
                2. Launch at Magic Eden Market Place <br />
                3. Private and Public Sales <br />
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
                Setting up the Id DAO
            </h3>
            <p className="paragraph paragraph-small">
                Id DAO will be the art investment platform led by NFT holders.
            </p>
            </div>
            <div className="stone-detail">
            <div className="paragraph paragraph-small">
                1. Primal Self DAO to be established by NFT holders and will
                function as an art investor to be directed. <br />
                2. Income model and sources include : <br />
                2.1. 10% of Mint revenue will go to the Id DAO
                <br />
                2.2. 2% of Royalty Fee will be transferred to Id DAO
                <br />
                2.3. 10% of its sales from the digital work to be made from Necmi
                Gürseler Virtual Art Gallery will go to Id DAO
                <br />
                2.4. 50% of the rental income of Necmi Gürseler Virtual Art Gallery
                will be transferred to the Id DAO
                <br />
                2.5. Transfers from the auctions to be held at Necmi Gürseler
                Virtual Art Gallery to the Id DAO
                <br />
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
                Establishment of the Id Virtual Universe
            </h3>
            <p className="paragraph paragraph-small">
                A virtual universe and workshops will be established in which NFT
                owners will also be shareholders.
            </p>
            </div>
            <div className="stone-detail">
            <div className="paragraph paragraph-small">
                1. Shares from the Id World to the character owner <br />
                1.1. Id virtual world is where Necmi Gürseler's workshop and virtual
                gallery universe currently exists and is looking forward to its new
                members. <br />
                2. Establishment of Necmi Gürseler Art Gallery in the Virtual
                Universe <br />
                2.1. Here is where the special launches before Necmi Gürseler's
                physical exhibitions are held 3. Establishment of Necmi Gürseler
                Workshop in the Virtual Universe <br />
                3.1. This is not only a site where Necmi Gürseler's workshop can
                only use and Necmi Gürseler's creativity is exhibited, but also to
                be a production center that can be used by all stakeholders to
                produce. <br />
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
                Real World Events
            </h3>
            <p className="paragraph paragraph-small">
                Discounts for Necmi Gürseler works. Free entry to exhibitions.
            </p>
            </div>
            <div className="stone-detail">
            <div className="paragraph paragraph-small">
                1. 1% of the income generated under this project will be shared with
                the NGO - to be determined by the community. <br />
                2. Character owners physically receive a discount code, that will
                allow them to receive a Necmi Gürseler artifact from the market with
                a better tag. <br />
                3. Free entrance to the Necmi Gürseler exhibitions and rights to
                attend special launches in Id Virtual universe. <br />
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
                ID Token
            </h3>
            <p className="paragraph paragraph-small">
                ID Token is the next generation Token of the art world.
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
        <h2 className="heading-secondary header-white">Team</h2>
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
                <a href="#" className="person-info-links-link">
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
                <a
                    href="https://www.instagram.com/alimgeyik027/"
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
        <h2 className="heading-secondary header-black">FAQ</h2>
        </div>
        <div className="row">
        <div className="questions">
            <div className="questions-question-text">
            <h3 className="heading-tertiary u-margin-bottom-small header-black">
                WHO IS NECMİ GÜRSELER?
            </h3>
            </div>
            <div className="questions-answer-text">
            <p className="paragraph paragraph-small">
                Necmi Gürseler was born in Istanbul in 1976. He studied at Anadolu
                University Fine Arts Faculty, Department of Painting - Halil Akdeniz
                Workshop between 2001-2005. As he worked as a painting instructor in
                Atölye Mart between 2005-2009, his writings were published as a
                column writer Gerçek Newspaper between 2009 and 2013. The artist
                continues to work in his workshop in Istanbul.
            </p>
            </div>
        </div>
        </div>
        <div className="row">
        <div className="questions">
            <div className="questions-question-text">
            <h3 className="heading-tertiary u-margin-bottom-small header-black">
                WHAT IS ID?
            </h3>
            </div>
            <div className="questions-answer-text">
            <p className="paragraph paragraph-small">
                {" "}
                Does someone is formed of the experiences he has gained during his
                life, or is he born with an accumulated past and an unchanging
                substance that has been engraved in his genetic codes? Necmi
                Gürseler's answers to these questions with his paintings show that
                he is in search of a spiritual self. This essence is the "ID".
            </p>
            </div>
        </div>
        </div>
        <div className="row">
        <div className="questions">
            <div className="questions-question-text">
            <h3 className="heading-tertiary u-margin-bottom-small header-black">
                WHAT IS THE PURPOSE OF THE PROJECT?
            </h3>
            </div>
            <div className="questions-answer-text">
            <p className="paragraph paragraph-small">
                Necmi Gürseler is a painter artist known throughout the country and
                his works are included in the collections of many collectors.
                Developing technological trends and the story of his paintings lead
                him to the idea that physical and digital can coexist, and carries
                creativity to many different dimensions. For these reasons, the
                purpose of the project can be summarized as : <br />
                1. It is to bring the character of the story he portrayed with the
                "ID Series" to life and to share the creative world of Necmi
                Gürseler with all his fans.
                <br />
                2. By taking technology with it, the infinity of creativity and
                imagination is witnessed.
                <br />
                3. To present this creative world digitally to those who cannot
                physically access the works, or who prefer to stay away from the
                physical work experience, and to spread this not only in the
                national but also in the international art community.
                <br />
                4. To break the perception that the artist is an inaccessible /
                inaccessible personality, to interact directly with their fans, to
                receive contributions from them as well as to have them gain
                benefits. <br />
                5. The slogan “Art is more beautiful when it is imagined and shared”
                also reveals the purpose of the project more clearly.
                <br />
            </p>
            </div>
        </div>
        </div>
        <div className="row">
        <div className="questions">
            <div className="questions-question-text">
            <h3 className="heading-tertiary u-margin-bottom-small header-black">
                How many ID Series collection items are there?
            </h3>
            </div>
            <div className="questions-answer-text">
            <p className="paragraph paragraph-small">
                Primitive Self / ID series collection consists of the characters
                that make up the 1976 hand-drawn ID Series story by Necmi Gürseler.{" "}
                <br />
                Number of artifacts by rarity:
                <br />
                Mystic - 4 <br />
                Supreme - 44 <br />
                Ultra Rare - 128 <br />
                Rare - 400 <br />
                Uncommon - 500 <br />
                Common - 900 <br />
            </p>
            </div>
        </div>
        </div>
        <div className="row">
        <div className="questions">
            <div className="questions-question-text">
            <h3 className="heading-tertiary u-margin-bottom-small header-black">
                When it will be out for sale?
            </h3>
            </div>
            <div className="questions-answer-text">
            <p className="paragraph paragraph-small">
                The sale date has not yet been determined, as it will be announced
                separately.
            </p>
            </div>
        </div>
        </div>
        <div className="row">
        <div className="questions">
            <div className="questions-question-text">
            <h3 className="heading-tertiary u-margin-bottom-small header-black">
                How can I own an ID Series art?
            </h3>
            </div>
            <div className="questions-answer-text">
            <p className="paragraph paragraph-small">
                The ID Series, which will be available for sale through the Solana
                network, will be minted on our website. If you missed the Minting
                stage, don't worry because you will be able to access the ID Series
                artifacts through Magic Eden.
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
        <p className="footer-copyright">
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
