import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import Features from '../components/Features';
import Showcase from '../components/Showcase';
import CTA from '../components/CTA';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import BlogPreview from '../components/BlogPreview';
import WaitlistModal from '../components/WaitlistModal';
import { supabase } from '../lib/supabase';

export default function Landing() {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleJoinWaitlist = async (email: string) => {
    try {
      const { error } = await supabase.from('waitlist').insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          alert('This email is already on the waitlist!');
        } else {
          console.error('Error joining waitlist:', error);
          alert('Something went wrong. Please try again.');
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleViewDemo = () => {
    navigate('/dashboard');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main>
      <Hero onSubmitEmail={handleJoinWaitlist} />
      <TrustedBy />
      <Features />
      <Showcase />
      <BlogPreview />
      <Testimonials />
      <FAQ />
      <CTA
        onJoinWaitlist={() => {
          setIsWaitlistModalOpen(true);
          scrollToTop();
        }}
        onViewDemo={handleViewDemo}
      />

      <WaitlistModal
        isOpen={isWaitlistModalOpen}
        onClose={() => setIsWaitlistModalOpen(false)}
        onSubmit={handleJoinWaitlist}
      />
    </main>
  );
}
