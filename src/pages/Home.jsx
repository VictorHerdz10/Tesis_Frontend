import React from 'react';

import Header from '../components/Header';
import HeroHome from '../components/HeroHome';
import FeaturesHome from '../components/Features';
import FeaturesBlocks from '../components/FeaturesBlocks';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import ContractManagement from "../components/gestion1";
import ContractManagement1 from "../components/gestion2";
import ContractManager from "../components/gestion3";
import UserManagementDashboard from "../components/user"
import Gestion from '../gestion3'
function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <HeroHome />
        <FeaturesHome />
        <FeaturesBlocks />
        <Testimonials />
        <Newsletter />

      </main>

      <Banner />

      {/*  Site footer */}
      <Footer />
<ContractManager/>
<ContractManagement/>
<ContractManagement1/>
<UserManagementDashboard/>

<Gestion/>
    </div>
  );
}

export default Home;