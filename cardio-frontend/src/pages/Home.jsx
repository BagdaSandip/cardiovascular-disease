import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import ModelInfo from '../components/ModelInfo';
import AssessmentForm from '../components/AssessmentForm';
import PredictionResult from '../components/PredictionResult';
import Footer from '../components/Footer';

const Home = () => {
  const [result, setResult] = useState(null);

  const handleReset = () => {
    setResult(null);
    // Small delay so DOM re-renders, then scroll to form
    setTimeout(() => {
      document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="app-wrapper">
      <Navbar />

      {/* ── Hero ── */}
      <Hero />

      <div className="page-content">



        {/* ── Form or Result ── */}
        {!result ? (
          <AssessmentForm onResult={setResult} />
        ) : (
          <PredictionResult result={result} onReset={handleReset} />
        )}
        
        {/* ── How It Works ── */}
        <HowItWorks />

        {/* ── Model Info ── */}
        <ModelInfo />

      </div>

      <Footer />
    </div>
  );
};

export default Home;
