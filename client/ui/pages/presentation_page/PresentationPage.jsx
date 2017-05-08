import React  from 'react'

export default PresentationPage = ()=> (
    <div className="landing-page landing-page1">
        <div className="wrapper">
            <div className="parallax">
                <div className="parallax-background">
                    <img className="parallax-background-image" src={'/images/home_page.jpg'}/>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-1 central">
                            <div className="description">
                                <h2><span style={{color: '#26C6DA', fontSize: "130pt", fontFamily: "MESFont4"}}>
                                            <span style={{color: '#FFFFFF'}}>M</span>ise
                                            <span style={{color: '#FFFFFF'}}>   E</span>n
                                            <span style={{color: '#FFFFFF'}}>   S</span>céne</span></h2>

                                <h2><span style={{fontFamily: "MESFont"}}>
                                            THE
                                            <span style={{color: '#91f98d'}}> B</span>
                                            <span style={{color: '#f3d93c'}}>E</span>
                                            <span style={{color: '#FF5041'}}>S</span>
                                            <span style={{color: '#26A4DA'}}>T </span>
                                            MOVIES FOR <span style={{color: 'rgba(38, 198, 218, 0.9)'}}> YOU</span>
                                            </span></h2>
                                <br />
                                <h5>Mise-En-Scène is a no-profit project developed by Politecnico di Milano,
                                    with the goal to investigates the use of automatically extracted visual features of
                                    videos in
                                    the context of recommender systems and brings some novel contributions in the
                                    domain of
                                    video recommendations.</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section section-gray section-clients">
                <div className="container text-center">
                    <h4 className="header-text"><span style={{fontFamily: "MESFont5", color: "#656565"}}>
                        R e c o m m e n d a t i o n &nbsp; & &nbsp; T e c h n o l o g i e s</span>
                    </h4>
                    <p id="firstp">
                        We propose a new content-based recommender system that encompasses a technique to automatically
                        analyze video contents and to extract a set of representative stylistic features
                        (lighting, color, and motion) grounded on existing approaches of Applied Media Theory.
                        The evaluation of the proposed recommendations, assessed w.r.t. relevance metrics (e.g., recall)
                        and compared with existing content-based recommender systems that exploit explicit features
                        such as movie genre, shows that our technique leads to more accurate recommendations.
                        Our proposed technique achieves better results not only when visual features are extracted
                        from full-length videos, but also when the feature extraction technique operates on
                        movie trailers, pinpointing that our approach is effective also when fulllength videos are
                        not available or when there are performance requirements.
                    </p>
                    <div className="logos">
                        <ul className="list-unstyled">
                            <li><img src={'/images/logopoliblack.png'}/></li>
                            {/*<li><img src={'/img-h/logos/react2.png'}/></li>
                             <li><img src={'/img-h/logos/meteor2.png'}/></li>*/}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="section section-features">
                <div className="container">
                    <h4 className="header-text text-center"><span style={{fontFamily: "MESFont5", color: "#656565"}}> F e a t u r e s </span>
                    </h4>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card card-blue">
                                <div className="icon">
                                    <i className="pe-7s-note2"/>
                                </div>
                                <div className="text">
                                    <h4><span style={{fontFamily: "MESFont5", color: "#656565"}}>Features</span>
                                    </h4>
                                    <p>
                                        The stylistic visual features of videos that we exploit in our recommendation
                                        algorithm have been studied not only in Computer Science but also from a
                                        semiotic and expressive point of view, in the theory and practice of
                                        movie making.
                                        The features taken into account in our algorithm are:<br />
                                        1. Corner Motion <br />
                                        2. Color variance <br />
                                        3. Object Motion <br />
                                        4. Lightening Key <br />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card card-blue">
                                <div className="icon">
                                    <i className="pe-7s-settings"/>
                                </div>
                                <h4><span style={{fontFamily: "MESFont5", color: "#656565"}}>Recommender Engine</span>
                                </h4>
                                <p>
                                    To generate recommendations using our Low-Level stylistic visual features,
                                    we adopted a classical "k-nearest neighbor" content-based algorithm.
                                    This method was initially tested with an offline evaluation.
                                    Now we'll compare the "k-nearest neighbor" content-based algorithm based on three
                                    different information: Features, Genres and Tags.
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
);    
