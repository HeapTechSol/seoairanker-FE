import { ChangeEvent, useEffect } from "react";

const useRichTextEditorInteractions = () => {
  
  const formatDoc = (key: string, value: string | null = null) => {
    if (value) {
      document.execCommand(key, false, value);
    } else {
      document.execCommand(key);
    }
  };

  const addLink = () => {
    const url = prompt("Insert url");
    if (url) {
      formatDoc("createLink", url);
    }
  };

  const addImageOrLink = (url: string) => {
    var img = document.createElement("img");
    img.src = url;
    img.draggable = true;
    var editor = document.getElementById("content");
    editor?.appendChild(img);
  };

  const addImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const url = e.target?.result as string;
            addImageOrLink(url);
        };
        reader.readAsDataURL(file);
    }
};

  useEffect(() => {
    const showCode = document.getElementById("show-code") as HTMLButtonElement;
    const content = document.getElementById("content") as HTMLDivElement;
    let active = false;

    const handleMouseEnter = () => {
      const a = content.querySelectorAll("a");
      a?.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          content.setAttribute("contenteditable", "false");
          (item as HTMLAnchorElement).target = "_blank";
        });
        item.addEventListener("mouseleave", () => {
          content.setAttribute("contenteditable", "true");
        });
      });
    };

    content?.addEventListener("mouseenter", handleMouseEnter);

    showCode?.addEventListener("click", () => {
      showCode.dataset.active = String(!active);
      active = !active;
      if (active) {
        content.textContent = content.innerHTML;
        content.setAttribute("contenteditable", "false");
      } else {
        content.innerHTML = content.textContent || "";
        content.setAttribute("contenteditable", "true");
      }
    });

    return () => {
      content?.removeEventListener("mouseenter", handleMouseEnter);
      showCode?.removeEventListener("click", () => {});
    };
  }, []);

  return { addLink, formatDoc, addImage };
};

export default useRichTextEditorInteractions;
