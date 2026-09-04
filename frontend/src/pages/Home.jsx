import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const features = [
  {
    icon: "♻️",
    title: "Give unused items a new life",
    text: "List clean clothes and household items that can help someone else."
  },
  {
    icon: "🤝",
    title: "Connect with verified NGOs",
    text: "Choose a trusted organization based on location and community needs."
  },
  {
    icon: "📅",
    title: "Schedule doorstep pickup",
    text: "Select a convenient time and track your collection from request to completion."
  },
  {
    icon: "📊",
    title: "Stay transparent",
    text: "Every donation has a clear status and is saved in your donation history."
  }
];

const steps = [
  {
    no: "01",
    title: "Register & list items",
    text: "Create your donor profile and add useful items."
  },
  {
    no: "02",
    title: "Choose a verified NGO",
    text: "Review organizations and select the best fit."
  },
  {
    no: "03",
    title: "Schedule pickup",
    text: "Pick a convenient date and time for collection."
  },
  {
    no: "04",
    title: "Track the impact",
    text: "Receive updates and keep your donation history."
  }
];

export default function Home() {
  const { user } = useAuth();

  return (
    <main>

      {/* HERO */}
      <section className="hero container">
        <div className="hero-copy">

          <div className="eyebrow">
            DONATE • REUSE • HELP
          </div>

          <h1>
            Give Your Unused Items{" "}
            <span>A New Life</span>
          </h1>

          <p>
            Donate clean clothes and household items to verified NGOs.
            Schedule a convenient doorstep pickup and turn unused things
            into meaningful support for someone in need.
          </p>

          <div className="hero-actions">
            <Link
              to="/donate"
              className="btn btn-primary btn-lg"
            >
              Donate an Item →
            </Link>

            <Link
              to="/ngos"
              className="btn btn-secondary btn-lg"
            >
              Find an NGO
            </Link>
          </div>

          <div className="trust-row">
            <span>✓ Verified organizations</span>
            <span>✓ Doorstep pickup</span>
            <span>✓ Donation tracking</span>
          </div>

        </div>

        {/* HERO VISUAL */}
        <div className="hero-art">

          <div className="float-card card-a">
            <span>👕</span>
            <b>Clean Clothes</b>
            <small>Ready to help</small>
          </div>

          <div className="circle-art">
            <div className="heart">♥</div>

            <div className="mini-tag">
              Small donation
              <br />
              <b>Big difference</b>
            </div>
          </div>

          <div className="float-card card-b">
            <span>🏠</span>
            <b>Household Items</b>
            <small>Give them a second life</small>
          </div>

        </div>
      </section>


      {/* HOW IT WORKS */}
      <section className="section soft">
        <div className="container">

          <div className="section-head">
            <div>
              <div className="eyebrow">
                SIMPLE PROCESS
              </div>

              <h2>
                How it works
              </h2>
            </div>

            <p>
              From your home to a verified organization
              in four simple steps.
            </p>
          </div>

          <div className="steps">

            {steps.map((step) => (
              <div className="step" key={step.no}>

                <div className="step-no">
                  {step.no}
                </div>

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.text}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* WHY REUSECONNECT */}
      <section className="section">
        <div className="container">

          <div className="section-head">
            <div>
              <div className="eyebrow">
                WHY REUSECONNECT
              </div>

              <h2>
                Built around trust and impact
              </h2>
            </div>

            <p>
              A simple and transparent way to give useful
              items a second life.
            </p>
          </div>

          <div className="feature-grid">

            {features.map((feature) => (
              <div
                className="feature"
                key={feature.title}
              >

                <div className="feature-icon">
                  {feature.icon}
                </div>

                <h3>
                  {feature.title}
                </h3>

                <p>
                  {feature.text}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* IMPACT STRIP */}
      <section className="section soft">
        <div className="container">

          <div className="section-head">
            <div>
              <div className="eyebrow">
                COMMUNITY IMPACT
              </div>

              <h2>
                Every contribution matters
              </h2>
            </div>
          </div>

          <div className="feature-grid">

            <div className="feature">
              <div className="feature-icon">👕</div>
              <h3>Clothes Reused</h3>
              <p>
                Give wearable clothes a meaningful second life.
              </p>
            </div>

            <div className="feature">
              <div className="feature-icon">🏠</div>
              <h3>Household Items</h3>
              <p>
                Help useful household items reach people who need them.
              </p>
            </div>

            <div className="feature">
              <div className="feature-icon">🌱</div>
              <h3>Less Waste</h3>
              <p>
                Reuse more and reduce unnecessary household waste.
              </p>
            </div>

            <div className="feature">
              <div className="feature-icon">❤️</div>
              <h3>Community Support</h3>
              <p>
                Connect donors with trusted community organizations.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* FINAL CTA */}
      <section className="cta container">

        <div>
          <div className="eyebrow">
            MAKE AN IMPACT
          </div>

          <h2>
            One unused item can become
            someone’s useful item.
          </h2>

          <p>
            Start your donation journey with ReuseConnect today.
          </p>
        </div>

        <Link
          className="btn btn-light btn-lg"
          to={user ? "/donate" : "/register"}
        >
          {user ? "Start a Donation →" : "Join ReuseConnect →"}
        </Link>

      </section>

    </main>
  );
}