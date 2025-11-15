import ProfileCard from './ProfileCard';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20" id="about">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <h1 className="gradient-text-white">
              Building the Future of Technology & Finance
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Crafting exceptional web experiences and strategic investment solutions
            </p>
            <p className="text-gray-500 leading-relaxed">
              I combine full-stack development expertise with value investing principles
              to build sustainable, high-performance solutions. Based in Sweden, bringing
              global perspectives to every project.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="btn btn-primary">
                <span className="relative z-10">View My Work</span>
              </button>
              <button className="btn btn-secondary">
                Get In Touch
              </button>
            </div>
          </div>

          {/* Right: Profile Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <ProfileCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
