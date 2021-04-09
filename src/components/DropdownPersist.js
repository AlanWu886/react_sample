import React, { useState } from 'react';
import { Dropdown} from 'react-bootstrap';


const DropdownPersist = (props) => {
  const [open, setOpen] = useState(false);
  const onToggle = (isOpen, ev, metadata) => {
    if (metadata.source === "select") {
      setOpen(true);
      return;
    }
    setOpen(isOpen);
  };
  return <Dropdown show={open} onToggle={onToggle} {...props}></Dropdown>;
};

export default DropdownPersist
