import { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export function TermsConditions() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen relative z-10" style={{ background: "#010515", color: "#e2e8f0" }}>
      <div className="max-w-4xl mx-auto px-6">
        
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">Terms and Conditions</h1>
          <p className="text-sm text-slate-400 mb-12">Last updated: June 2026</p>

          <div className="space-y-8 text-[15px] leading-relaxed text-slate-300" style={{ fontFamily: "Inter, sans-serif" }}>
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing our website and using our services, you agree to be bound by these Terms and Conditions and agree that you are responsible for the agreement with any applicable local laws. 
                If you disagree with any of these terms, you are prohibited from accessing this site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on Jronix's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-400">
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose or for any public display;</li>
                <li>attempt to reverse engineer any software contained on Jronix's Website;</li>
                <li>remove any copyright or other proprietary notations from the materials; or</li>
                <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Disclaimer</h2>
              <p>
                All the materials on Jronix's Website are provided "as is". Jronix makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Jronix does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Limitations</h2>
              <p>
                Jronix or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on Jronix's Website, even if Jronix or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Revisions and Errata</h2>
              <p>
                The materials appearing on Jronix's Website may include technical, typographical, or photographic errors. Jronix will not promise that any of the materials in this Website are accurate, complete, or current. Jronix may change the materials contained on its Website at any time without notice. Jronix does not make any commitment to update the materials.
              </p>
            </section>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
