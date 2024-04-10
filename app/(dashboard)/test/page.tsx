'use client'

import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'tailwindcss/tailwind.css';

const ItemType = 'MenuItem';

const DraggableMenuItem = ({ id, text }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id, text },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 m-1 bg-blue-500 text-white rounded cursor-pointer ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {text}
    </div>
  );
};

const DropArea = ({ items, setItems, index }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const componentRect = monitor.getSourceClientOffset();
      let dropIndex = items.length;

      if (clientOffset && componentRect) {
        const yDifference = clientOffset.y - componentRect.y;
        dropIndex = Math.floor(yDifference / 30); // Assuming each item has a height of 30px
      }

      const newItems = [...items];
      newItems.splice(dropIndex, 0, { id: item.id, text: item.text });
      setItems(index, newItems);
    },
  }));

  return (
    <div ref={drop} className="mt-5 p-5 bg-gray-200 rounded min-h-[100px]">
      {items.map((item, index) => (
        <DraggableMenuItem key={item.id} id={`${index}-${item.id}`} text={item.text} />
      ))}
    </div>
  );
};

function DragDropMenu() {
  const [areas, setAreas] = useState([]);

  const addDropArea = () => {
    setAreas([...areas, []]);
  };

  const setItems = (areaIndex, newItems) => {
    const newAreas = areas.map((area, index) => {
      if (index === areaIndex) {
        return newItems;
      }
      return area;
    });
    setAreas(newAreas);
  };

  const menuItems = [];
  for (let i = 1; i <= 10; i++) {
    menuItems.push(<DraggableMenuItem key={i} id={i.toString()} text={`Item ${i}`} />);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-wrap justify-around">
        {areas.map((items, index) => (
          <DropArea key={index} items={items} setItems={setItems} index={index} />
        ))}
      </div>
      <button className="mt-4 p-2 bg-green-500 text-white rounded" onClick={addDropArea}>
        Add Drop Area
      </button>
      <div className="flex flex-col items-center mt-4">
        {menuItems}
      </div>
    </DndProvider>
  );
}

export default DragDropMenu;

