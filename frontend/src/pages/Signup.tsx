import Auth from "../components/Auth";
import Quote from "../components/Quote";

const Signup = () => {
  return (
    <div className="grid grid-cols-2 ">
      <div>
        <Auth />
      </div>
      <div className="visible lg:invisible">
        <Quote />
      </div>
    </div>
  );
};

export default Signup;
