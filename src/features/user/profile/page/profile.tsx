import { memo } from "react";
import Hero from "../components/hero/hero";

const UserProfilePage = () => {
  return (
    <section className="my-5">
      <div className="container">
        <Hero />
      </div>
    </section>
  );
};

export default memo(UserProfilePage);
