# Deprecated z-index css variables

In V4, we are using Spark tokens and will no longer be supporting the following z-index override variables. Below are the token equivalents to the v3 z-index variables

| components                                                  | v3 variable name   | v3 z-index value | v4 token name                 | v4 token value |
| ----------------------------------------------------------- | ------------------ | ---------------- | ----------------------------- | -------------- |
| Default z-index value for basic elements                    | N/A                | N/A              | gse-semantic-zIndex-base      | 0              |
| Apply to elements that need an elevated focus style control | N/A                | N/A              | gse-semantic-zIndex-showFocus | 1              |
| used for sticky headers                                     | N/A                | N/A              | gse-semantic-zIndex-sticky    | 1              |
| Popups (used in dropdowns, date pickers, etc)               | gux-zindex-popup   | 1                | gse-semantic-zIndex-popup     | 100            |
| Popovers                                                    | gux-zindex-popover | 2                | gse-semantic-zIndex-popover   | 200            |
| Tooltips                                                    | gux-zindex-tooltip | 1                | gse-semantic-zIndex-tooltip   | 200            |
| Panels (reserved for future use)                            | N/A                | N/A              | gse-semantic-zIndex-panel     | 300            |
| Navigation bars (reserved for future use)                   | N/A                | N/A              | gse-semantic-zIndex-navbar    | 400            |
| Side Navigation bars (reserved for future use)              | N/A                | N/A              | gse-semantic-zIndex-sidebar   | 400            |
| Toasts                                                      | N/A                | N/A              | gse-semantic-zIndex-toast     | 500            |
| Modals                                                      | gux-zindex-modal   | 1                | gse-semantic-zIndex-modal     | 600            |
