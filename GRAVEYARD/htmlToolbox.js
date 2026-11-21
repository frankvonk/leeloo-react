const Button = (label, className, onClick) =>  {
  const button = document.createElement('button');
  button.innerText = label;
  button.className = className;
  if(onClick)
  button.addEventListener('click', onClick);
  return button;
};
const Row = (items, className) => {
  const row = document.createElement('div');
  if (className) row.className = className;
  row.style.display = 'flex';
  row.style.flexDirection = 'row';
  // const items = Array.isArray(cells) ? cells : [cells];
  if (items)
    items.forEach(item => row.appendChild(item));
  return row;
}
const Column = (items, className) => {
  const column = document.createElement('div');
  if (className) column.className = className;
  column.style.display = 'flex';
  column.style.flexDirection = 'column';
  // const items = Array.isArray(cells) ? cells : [cells];
  if (items) {
    items.forEach(item => column.appendChild(item));
  }
  return column;
}


// RowInception - A function that returns a builder function for creating and adding to flex rows
const RowInception = (items = [], className = null) => {
  const element = document.createElement('div');
  if (className) element.className = className;
  element.style.display = 'flex';
  element.style.flexDirection = 'row';
  element.style.justifyContent = 'space-between'; // Vertically center items
  
  // Add initial items if provided
  if (items && Array.isArray(items)) {
    items.forEach(item => element.appendChild(item));
  }
  

  // Return a builder function with methods
  const builder = {
    // Add one or more elements
    add: (...items) => {
      items.forEach(item => element.appendChild(item));
      return builder; // Return builder for chaining
    },
    
    // Set or add CSS class
    addClass: (className) => {
      element.classList.add(className);
      return builder;
    },
    
    // Set inline styles
    style: (styleObj) => {
      Object.assign(element.style, styleObj);
      return builder;
    },
    
    // Get the actual DOM element
    element: () => element,
    
    // Shortcut to get element (for easier usage)
    build: () => element
  };
  
  return builder;
};
