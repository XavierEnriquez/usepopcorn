import { useState } from "react";

/////////////////////////
// Passing props or components implicitly with children prop **prefered way in react**
export default function ContentBlock({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

//// Same results as above, if passing props explicitly, will need to change the prop name from children to something else like el or element or whatever instead
// function ContentBlock({ element }) {
//   const [isOpen, setIsOpen] = useState(true);
//   return (
//     <div className="box">
//       <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
//         {isOpen ? "–" : "+"}
//       </button>
//       {isOpen && children}
//     </div>
//   );
// }
////////////////////////

{
  /* Same results as above but passing components explicilty */
}
{
  /* <ContentBlock element={<MoviesList movies={movies} />} />

        <ContentBlock
          element={
            <>
              <WatchedSummaryCard watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          }
        /> */
}
