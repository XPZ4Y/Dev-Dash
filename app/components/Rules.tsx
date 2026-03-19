import React from "react";

const Rules = () => {
  return (
    <section id="rules">
      <div className="py-16 px-4 sm:px-8 bg-brand-black text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
            Rules and Regulations
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">1. Team Formation</h3>
              <p>
                Teams can consist of 1 to 4 members. All participants{" "}
                <span className="highlight">must be registered</span> for the
                hackathon.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">2. Duration</h3>
              <p>
                This is an <span className="highlight">8-hour hackathon</span>.
                All work on the project must be done within this time frame.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">3. Code of Conduct</h3>
              <p>
                All participants must adhere to a{" "}
                <span className="highlight">strict code of conduct</span>. Be
                respectful to other participants and organizers. Any form of
                harassment will <span className="highlight">not be tolerated</span>.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">4. Project Submission</h3>
              <p>
                All projects must be submitted to the designated platform{" "}
                <span className="highlight">before the deadline</span>. Late
                submissions will not be accepted.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">5. Intellectual Property</h3>
              <p>
                All code, designs, and other intellectual property created during
                the hackathon will{" "}
                <span className="highlight">
                  remain the property of the participants
                </span>
                . However, by participating, you grant the organizers the right
                to use your project for promotional purposes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">6. Originality</h3>
              <p>
                All work <span className="highlight">must be original</span>. You
                may use open-source libraries and frameworks, but the core of
                your project must be your own work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rules;