import { useState } from "react";

/**
 * Reusable star rating component
 */

// Styles are set outside the component so they are not re-render every time with the component,
// but in the same file so component can be re-used on multiple apps without having to import a css file for each app
const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const starContainerStyle = {
  display: "flex",
  alignItems: "center",
};

const textStyle = {
  fontSize: "1.5rem",
  fontWeight: "500",
  lineHeight: "1",
  margin: "0",
};

function Star({ onClick, fullStar, onHover, onHoverOut, color, size }) {
  const startStyle = {
    width: size,
    height: size,
    display: "block",
    cursor: "pointer",
  };
  return (
    <span
      role="button"
      style={startStyle}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onHoverOut}
    >
      {fullStar ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

// if no maxRating is passed, a default maxRating is set right with the prop
export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 30,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [hoverRating, setHoverRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
    // onSetRating prop is here used so the rating value is passed and consumed outside the component
    onSetRating(rating);
  }
  function handleHover(hoverRating) {
    setHoverRating(hoverRating);
  }

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from(
          { length: messages.length === 0 ? maxRating : messages.length },
          (_, i) => (
            <Star
              key={i}
              onClick={() => handleRating(i + 1)}
              fullStar={hoverRating ? hoverRating >= i + 1 : rating >= i + 1}
              onHover={() => handleHover(i + 1)}
              onHoverOut={() => setHoverRating(0)}
              color={color}
              size={size}
            />
          )
        )}
      </div>
      <p style={textStyle}>
        {messages.length > 0
          ? messages[hoverRating ? hoverRating - 1 : rating - 1]
          : hoverRating || rating || ""}
      </p>
    </div>
  );
}
