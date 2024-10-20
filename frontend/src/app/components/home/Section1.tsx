const Section1 = () => {
  return (
    <>
      <div className="bg-[url('/images/map-background.jpg')] h-[463px] flex flex-col items-center justify-center">
        <h2 className="text-[#110a61] text-[60px] font-bold">Bright Future</h2>
        <form className="mt-[30px] mb-[15px]">
          <input
            type="text"
            placeholder="Enter your address"
            className="h-[40px] w-[400px] outline-none pl-[15px]"
          />
          <button className="px-[15px] py-[10px] text-white font-bold bg-primary-orange">
            CHECK MY ROOF
          </button>
        </form>
        <p className="mb-[30px] w-[400px] text-center">
          Search for your home. Discover your solar savings potential. See what
          is possible with solar in your Vietnam community.
        </p>
        <div className="text-blue-600">
          <a href="/">Explore your are</a>
        </div>
      </div>
    </>
  );
};
export default Section1;
