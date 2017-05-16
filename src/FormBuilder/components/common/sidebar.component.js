import React from 'react';


 const Sidebar=()=>(

    <section className="nav_bar">
        <ul className="navigation">
            <li className="nav_item dashboard"><a><span className="nav_icon"></span><span className="nav_text">Dashboard</span> </a></li>
            <li className="nav_item projects active"><a><span className="nav_icon"></span><span className="nav_text">Projects</span> </a></li>
            <li className="nav_item user"><a><span className="nav_icon"></span><span className="nav_text">User</span> </a></li>
            <li className="nav_item result"><a><span className="nav_icon"></span><span className="nav_text">Results</span> </a></li>
            <li className="nav_item community"><a><span className="nav_icon"></span><span className="nav_text">Community</span> </a></li>
        </ul>
    </section>
);

export default Sidebar;
