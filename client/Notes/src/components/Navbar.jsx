import { Link } from "react-router-dom";
import { IoAddCircleOutline, IoFilterOutline, IoClose } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { useContext, useState } from "react";
import { FilterContext } from "../context/FilterContext";

const Navbar = () => {
  const { setSearchTitle, setSelectedState, setFilterDate } =
    useContext(FilterContext);

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleSearch = (e) => {
    setSearchTitle(e.target.value.toLowerCase());
  };
  const handleState = (e) => {
    setSelectedState(e.target.value);
  };
  const handleDate = (e) => {
    setFilterDate(e.target.value);
  };
  const clearFilters = () => {
    setSearchTitle("");
    setSelectedState("");
    setFilterDate("");
  };
  const handleClose = () => {
    setIsFilterVisible(false);
  };

  return (
    <nav className="bg-[#635167] fixed w-full px-2 h-[15vh] flex justify-between items-center gap-4">
      <div>
        <h1 className="text-center text-[white] font-distressed text-md md:text-2xl uppercase tracking-wider">
          <Link to="/" onClick={handleClose}>
            Mindlog
          </Link>
        </h1>
      </div>
      <div className="flex ">
        <button className="text-white font-mono text-2xl md:text-[4xl] py-1 px-2">
          <Link to="/" onClick={handleClose}>
            <AiOutlineHome />
          </Link>
        </button>
        <button
          onClick={() => setIsFilterVisible((prev) => !prev)}
          className="text-white font-mono text-2xl md:text-[4xl] py-1 px-2"
        >
          <IoFilterOutline />
        </button>

        {isFilterVisible && (
          <div className="absolute top-[15vh] right-0 bg-[white] p-4  shadow-lg w-64">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-[#635167]">Filters</h2>
              <button onClick={handleClose} className="text-[#635167] text-2xl">
                <IoClose />
              </button>
            </div>

            <input
              type="text"
              placeholder="Search Title..."
              onChange={handleSearch}
              className="px-3 py-1 text-sm rounded-md outline-none mb-2 w-full border"
            />
            <select
              onClick={handleState}
              className="px-2 py-1 text-sm rounded-md outline-none mb-2 w-full border cursor-pointer"
            >
              <option value="">All States</option>
              <option value="happy">Happy 😄</option>
              <option value="sad">Sad 😞</option>
              <option value="excited">Excited 🤩</option>
              <option value="angry">Angry 😡</option>
              <option value="normal">Normal 🔘</option>
              <option value="important">Important ⭐</option>
              <option value="bored">Bored 🥱</option>
            </select>
            <input
              onChange={handleDate}
              type="date"
              className="px-3 cursor-pointer py-1 text-sm rounded-md outline-none mb-2 w-full border"
            />
            <div className="flex justify-end ">
              <button
                onClick={clearFilters}
                className=" bg-[red] text-xs text-white px-3 py-1 rounded-sm  mt-2 hover:bg-red-600 transition-all"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        <Link to="/add">
          <button className="text-white font-mono text-2xl md:text-[4xl] py-1 px-2">
            <IoAddCircleOutline />
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
