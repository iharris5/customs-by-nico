(() => {
  const SHOPIFY_STORE =
    "https://customsbynico-store.myshopify.com";

  const SHOES = {
    "Cherry Blossom Snoopy w/ Custom Name": {
      variantId: "67698977177760",
      shopifyUrl:
        "https://customsbynico-store.myshopify.com/products/pink-cherry-blossoms-snoopy-custom-af1s"
    }
  };

  const modal = document.getElementById("shoe-size-modal");
  const groupsContainer = document.getElementById("shoe-size-groups");
  const productName = document.getElementById("shoe-size-product-name");
  const error = document.getElementById("shoe-size-error");
  const form = document.getElementById("shoe-size-form");
  const variantInput = document.getElementById("shopify-variant-id");
  const sizeInput = document.getElementById("selected-shoe-size-property");
  const continueButton = document.getElementById("confirm-shoe-size");

  if (
    !modal ||
    !groupsContainer ||
    !productName ||
    !error ||
    !form ||
    !variantInput ||
    !sizeInput ||
    !continueButton
  ) {
    console.error("Shoe size selector: Required HTML elements are missing.");
    return;
  }

  let currentShoe = null;
  let selectedSize = null;

  function numericSizes(start, end, suffix = "", prefix = "") {
    const sizes = [];

    for (
      let size = Math.round(start * 2);
      size <= Math.round(end * 2);
      size++
    ) {
      sizes.push(prefix + size / 2 + suffix);
    }

    return sizes;
  }

  const SIZE_GROUPS = [
    { name: "Men", sizes: numericSizes(5, 16, "", "M ") },
    { name: "Women", sizes: numericSizes(5, 12, "", "W ") },
    { name: "Big Kids", sizes: numericSizes(3.5, 7, "Y") },
    {
      name: "Little Kids",
      sizes: [
        ...numericSizes(10.5, 13.5, "C"),
        ...numericSizes(1, 3, "Y")
      ]
    },
    { name: "Babies", sizes: numericSizes(1, 10, "C") }
  ];

  function renderSizeGroups() {
    groupsContainer.replaceChildren();
    selectedSize = null;
    sizeInput.value = "";
    error.hidden = true;
    continueButton.disabled = true;

    SIZE_GROUPS.forEach((group, index) => {
      const details = document.createElement("details");
      details.className = "shoe-size-group";
      details.open = index === 0;

      const summary = document.createElement("summary");
      summary.className = "shoe-size-group__title";
      summary.textContent = group.name;

      const grid = document.createElement("div");
      grid.className = "shoe-size-grid";

      group.sizes.forEach((size) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "shoe-size-option";
        button.textContent = size;
        button.setAttribute("aria-pressed", "false");

        button.addEventListener("click", () => {
          selectedSize = size;
          sizeInput.value = size;
          error.hidden = true;
          continueButton.disabled = false;

          groupsContainer
            .querySelectorAll(".shoe-size-option")
            .forEach((option) => {
              const active = option === button;
              option.classList.toggle("selected", active);
              option.setAttribute("aria-pressed", String(active));
            });
        });

        grid.appendChild(button);
      });

      details.addEventListener("toggle", () => {
        if (!details.open) return;

        groupsContainer
          .querySelectorAll(".shoe-size-group")
          .forEach((other) => {
            if (other !== details) other.open = false;
          });
      });

      details.append(summary, grid);
      groupsContainer.appendChild(details);
    });
  }

  function openShoeSizePicker(shoe) {
    if (!shoe || !SHOES[shoe.character]) {
      console.error(
        "No Shopify checkout configuration for this shoe:",
        shoe?.character
      );
      return;
    }

    currentShoe = SHOES[shoe.character];

    productName.textContent = shoe.character;
    variantInput.value = currentShoe.variantId;

    renderSizeGroups();

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("shoe-size-modal-open");
  }

  function closeShoeSizePicker() {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("shoe-size-modal-open");
  }

  modal.querySelectorAll("[data-close-size-modal]").forEach((button) => {
    button.addEventListener("click", closeShoeSizePicker);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!selectedSize || !currentShoe) {
      error.hidden = false;
      return;
    }
    continueButton.disabled = true;
    continueButton.textContent = "Adding to cart...";
   
    try {
	    await window.addShoeToCart({
		    variantId: currentShoe.variantId,
		    character: productName.textContent,
		    imageUrl: currentShoe.imageUrl || "",
		    size: selectedSize
	    });
  
        closeShoeSizePicker();
  } catch (err) {
    console.error("Could not add shoe to cart:", err);
    error.textContent =
      "Unable to add this shoe to your cart. Please try again.";
    error.hidden = false;
  } finally {
    continueButton.disabled = false;
    continueButton.textContent = "Continue";
  }
  });

  window.openShoeSizePicker = openShoeSizePicker;
})();
