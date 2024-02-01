# React Modal

A simple and reusable modal component for React.

## Installation

The package can be installed via NPM:

```
npm i @florent-eeckman/modal-library --save
```

## Configuration

The most basic use of the Modal can be described with:

First the ModalProvider :

```js
import { ModalProvider } from "@florent-eeckman/modal-library";

const ExempleApp = () => {
  <ModalProvider escapeClose={true}>
    <ExempleComponent />
  </ModalProvider>;
};
```

Then the Modal can be created by the function openModal of useModal:

```js
import { useModal } from "@florent-eeckman/modal-library";

const ExempleComponent = () => {
  const { openModal } = useModal();

  const handleSubmit = () => {
    openModal({
      id: "01",
      title: "New Employee",
      desc: "Employee Created!",
      closeExisting: true,
      clickClose: true,
      closeClass: "closeClass",
      showClose: true,
      modalClass: "modalClass",
      blockerClass: "blockerClass",
    });
  };
  return (
    <>
      <button onClick={handleSubmit()}></button>
    </>
  );
};
```

### useModal options

the different options of useModal :

```js
const { Modals, openModal, closeModal, isActive, getCurrentModal } = useModal();
```

- Modals : array of modals
- openModal() : function for open a modal
- closeModal() : function for close a modal
- isActive() : return true if a modal is active
- getCurrentModal() : function for get current modal

### openModal options

the different options of openModal :

```js
      id: "",                 // id of modal
      title: "",              // title of the modal
      desc: "",               // text description of the modal
      clickClose: true,       // Allows the user to close the modal by clicking the overlay
      showClose: true,        // Shows a (X) icon/link in the top-right corner
      closeClass: '',         // Add additional class(es) to the close <a> tag.
      blockerClass: "modal",  // CSS class added to the overlay (blocker).
      closeExisting: true,    // Close existing modals. Set this to false if you need to stack multiple modal instances.

```
