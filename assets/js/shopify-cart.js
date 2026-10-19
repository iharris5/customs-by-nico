
(() => {
  const SHOP = "customsbynico-store.myshopify.com";
  const API_VERSION = "2026-10";

  const TOKEN = "18f55e7f8347c713674ea89ad53c00d0";

  const API_URL =
    `https://${SHOP}/api/${API_VERSION}/graphql.json`;

  let cartId = null;
  let cartData = null;

  const drawer = document.getElementById("shop-cart-drawer");
  const backdrop = document.getElementById("shop-cart-backdrop");
  const itemsContainer = document.getElementById("shop-cart-items");
  const subtotalElement = document.getElementById("shop-cart-subtotal");
  const countElement = document.getElementById("shop-cart-count");
  const drawerCount = document.getElementById("shop-cart-count-drawer");

  const CART_QUERY = `
    query GetCart($id: ID!) {
      cart(id: $id) {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              attributes {
                key
                value
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  image {
                    url
                    altText
                  }
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  async function shopifyRequest(query, variables = {}) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN
      },
      body: JSON.stringify({ query, variables })
    });

    if (!response.ok) {
      throw new Error(`Shopify request failed: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors?.length) {
      throw new Error(result.errors.map(e => e.message).join("; "));
    }

    return result.data;
  }

  function openCart() {
    drawer.classList.add("open");
    backdrop.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("cart-open");
  }

  function closeCart() {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cart-open");
  }

  document.getElementById("shop-cart-toggle")
    ?.addEventListener("click", openCart);

  document.getElementById("shop-cart-close")
    ?.addEventListener("click", closeCart);

  backdrop?.addEventListener("click", closeCart);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeCart();
  });

  function money(amount, currency) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(Number(amount));
  }

  async function refreshCart() {
    if (!cartId) {
      cartData = null;
      renderCart();
      return;
    }

    const data = await shopifyRequest(CART_QUERY, { id: cartId });
    cartData = data.cart;

    if (!cartData) {
      cartId = null;
      renderCart();
      return;
    }

    renderCart();
  }

  function renderCart() {
    const lines = cartData?.lines?.edges || [];
    const quantity = cartData?.totalQuantity || 0;

    countElement.textContent = quantity;
    drawerCount.textContent = quantity;
    itemsContainer.replaceChildren();

    if (!lines.length) {
      itemsContainer.textContent = "Your cart is empty.";
      subtotalElement.textContent = "$0.00";
      return;
    }

    lines.forEach(({ node: line }) => {
      const variant = line.merchandise;
      const attributes = Object.fromEntries(
        line.attributes.map(attribute => [
          attribute.key,
          attribute.value
        ])
      );

      const item = document.createElement("div");
      item.className = "shop-cart-item";

      if (variant.image?.url) {
        const image = document.createElement("img");
        image.src = variant.image.url;
        image.alt = variant.image.altText || variant.product.title;
        image.loading = "lazy";
        image.width = 80;
        image.height = 80;
        item.appendChild(image);
      }

      const details = document.createElement("div");
      details.className = "shop-cart-item-details";

      const title = document.createElement("h3");
      title.textContent = variant.product.title;
      details.appendChild(title);

      if (attributes["Shoe size"]) {
        const size = document.createElement("p");
        size.textContent = `Size: ${attributes["Shoe size"]}`;
        details.appendChild(size);
      }

      const variantTitle = document.createElement("p");
      variantTitle.textContent =
        variant.title === "Default Title" ? "" : variant.title;
      details.appendChild(variantTitle);

      const quantityControls = document.createElement("div");
      quantityControls.className = "shop-cart-quantity";

      const minus = document.createElement("button");
      minus.type = "button";
      minus.textContent = "−";
      minus.setAttribute("aria-label", "Decrease quantity");
      minus.disabled = line.quantity <= 1;
      minus.addEventListener("click", () =>
        updateQuantity(line.id, line.quantity - 1)
      );

      const quantityLabel = document.createElement("span");
      quantityLabel.textContent = line.quantity;

      const plus = document.createElement("button");
      plus.type = "button";
      plus.textContent = "+";
      plus.setAttribute("aria-label", "Increase quantity");
      plus.addEventListener("click", () =>
        updateQuantity(line.id, line.quantity + 1)
      );

      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "Remove";
      remove.addEventListener("click", () =>
        removeLine(line.id)
      );

      quantityControls.append(minus, quantityLabel, plus, remove);
      details.appendChild(quantityControls);
      item.appendChild(details);
      itemsContainer.appendChild(item);
    });

    const subtotal = cartData.cost.subtotalAmount;
    subtotalElement.textContent = money(
      subtotal.amount,
      subtotal.currencyCode
    );
  }

  async function updateQuantity(lineId, quantity) {
    try {
      await shopifyRequest(`
        mutation UpdateCartLine(
          $cartId: ID!,
          $lines: [CartLineUpdateInput!]!
        ) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
              id
            }
            userErrors {
              message
            }
          }
        }
      `, {
        cartId,
        lines: [{ id: lineId, quantity }]
      });

      await refreshCart();
    } catch (err) {
      console.error(err);
      alert("Unable to update the cart. Please try again.");
    }
  }

  async function removeLine(lineId) {
    try {
      await shopifyRequest(`
        mutation RemoveCartLine(
          $cartId: ID!,
          $lineIds: [ID!]!
        ) {
          cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart {
              id
            }
            userErrors {
              message
            }
          }
        }
      `, {
        cartId,
        lineIds: [lineId]
      });

      await refreshCart();
    } catch (err) {
      console.error(err);
      alert("Unable to remove this item. Please try again.");
    }
  }

  async function addShoeToCart(shoe) {
    const numericId = String(shoe.variantId).replace(
      "gid://shopify/ProductVariant/", ""
    );

    const merchandiseId = `gid://shopify/ProductVariant/${numericId}`;

    const line = {
      merchandiseId,
      quantity: 1,
      attributes: [
        { key: "Shoe size", value: shoe.size }
      ]
    };

    if (!cartId) {
      const data = await shopifyRequest(`
        mutation CreateCart($lines: [CartLineInput!]!) {
          cartCreate(input: { lines: $lines }) {
            cart {
              id
            }
            userErrors {
              message
            }
          }
        }
      `, { lines: [line] });

      const result = data.cartCreate;

      if (result.userErrors.length || !result.cart) {
        throw new Error(
          result.userErrors.map(e => e.message).join("; ") ||
          "Shopify did not create the cart."
        );
      }

      cartId = result.cart.id;
    } else {
      const data = await shopifyRequest(`
        mutation AddCartLines(
          $cartId: ID!,
          $lines: [CartLineInput!]!
        ) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
              id
            }
            userErrors {
              message
            }
          }
        }
      `, { cartId, lines: [line] });

      const result = data.cartLinesAdd;

      if (result.userErrors.length) {
        throw new Error(
          result.userErrors.map(e => e.message).join("; ")
        );
      }
    }

    await refreshCart();
    openCart();
  }

  document.getElementById("shop-cart-checkout")
    ?.addEventListener("click", () => {
      if (cartData?.checkoutUrl) {
        window.location.href = cartData.checkoutUrl;
      }
    });

  window.addShoeToCart = addShoeToCart;

  // Restore an existing cart ID if one was saved for this session.
  try {
    cartId = sessionStorage.getItem("shopify-cart-id");
  } catch (err) {
    console.warn("Cart session storage is unavailable.");
  }

  // Save cart ID after it is created.
  const originalAdd = addShoeToCart;

  window.addShoeToCart = async shoe => {
    await originalAdd(shoe);

    try {
      if (cartId) {
        sessionStorage.setItem("shopify-cart-id", cartId);
      }
    } catch (err) {
      console.warn("Unable to save cart session.");
    }
  };

  refreshCart().catch(err => {
    console.error("Could not restore Shopify cart:", err);
  });
})();

