import '../components/css/bootstrap.min.css'
import '../components/css/flexslider.css';
import '../components/css/animsition.min.css';
import '../components/css/style.css';
import '../components/css/owl.carousel.css';
import '../components/css/owl.theme.css';
import '../index.css'

const Landingpage = () => {
    return (
        <div className="animsition">
            {/* Border */}
            <span className="frame-line top-frame visible-lg"></span>
            <span className="frame-line right-frame visible-lg"></span>
            <span className="frame-line bottom-frame visible-lg"></span>
            <span className="frame-line left-frame visible-lg"></span>

            {/* HEADER */}
            <header className="tw-main-header">
                <div className="tw-container-fluid">
                    {/* Box header */}
                    <div className="tw-box-header">
                        <div className="tw-box-logo">
                            <a href="index.html">
                                <img src="../components/img/LOGO.png" width="80" alt="Logo" />
                            </a>
                        </div>
                        <a className="tw-box-primary-nav-trigger" href="#0">
                            <span className="tw-box-menu-icon"></span>
                        </a>
                    </div>
                    {/* End box header */}

                    {/* Box intro */}
                    <section className="tw-box-intro tw-bg-film">
                        <div className="tw-table-cell">
                            <h3 className="tw-box-headline tw-letters tw-rotate-2">
                <span className="tw-box-words-wrapper">
                  <b className="tw-is-visible">DIVE &nbsp;&amp;&nbsp; CONNECT.</b>
                  <b>&nbsp;DEPTH &nbsp;&amp;&nbsp; DISCOVERY.</b>
                </span>
                            </h3>
                            <h1>CLUB BUBBLES</h1>
                        </div>
                        <div className="mouse">
                            <div className="scroll"></div>
                        </div>
                    </section>
                    {/* End box intro */}
                </div>
            </header>

            <section id="about" className="about tw-mt-150 tw-mb-50">
                <div className="container">
                    <div className="row center">
                        <div className="tw-col-md-8 tw-col-md-offset-2">
                            <img src="../components/img/about.png" alt="About Template" width="300" />
                            <div className="km-space"></div>
                            <h5 className="lead">
                                This is our most powerful template that provides functionality to create corporate, app showcase, gaming, music, barber, etc. websites.
                            </h5>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landingpage;
