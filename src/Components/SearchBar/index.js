const SearchBar = ({onChange , value}) => {
   return (
         <input type="text" onChange={onChange} value={value} placeholder="Search.." 
         className="lg:w-[350px] w-[80%] min-h-[40px] px-1 text-lg
         bg-transparent text-gray-700 placeholder-gray-600 focus:outline-none border-2"/>
   )
 }
 
 export default SearchBar