const SidebarTools = () => {
  return (
    <div className="rich-text-editor-sidebar-tools">
      <button
        id="dragged-button"
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData(
            "text/plain",
            (e.target as HTMLButtonElement).id
          );
        }}
      >
        Button
      </button>
    </div>
  );
};

export default SidebarTools;
