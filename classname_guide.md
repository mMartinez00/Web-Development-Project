# HTML Class Naming Reference (BEM + kebab-case)

This file defines how HTML class names should be written across **all pages**. It uses the BEM methodology combined with kebab-case for consistency and readability.

---

## Naming Convention

**Format:**
```
.block
.block__element
.block--modifier
```

### Rules
- Use **lowercase** letters only; separate words with **hyphens**.
- Class names must be **descriptive**, not presentational (avoid color or layout terms).
- Prefix class names with their **block context** to prevent collisions.
- Use **modifiers** for variations (e.g., `button--primary`, `card--highlighted`).
- Keep naming **consistent** across all pages (navbars, footers, forms, product listings, etc.).

---

## Example HTML (cart.html)

Below is a sample implementation of these conventions in practice:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Cart</title>
</head>
<body>

  <nav class="navbar">
    <div class="navbar__brand">Logo</div>
    <ul class="navbar__menu">
      <li class="navbar__item"><a class="navbar__link" href="./index.html">Home</a></li>
      <li class="navbar__item"><a class="navbar__link" href="./about.html">About</a></li>
      <li class="navbar__item"><a class="navbar__link" href="./blog.html">Blog</a></li>
      <li class="navbar__item"><a class="navbar__link" href="./product.html">Shop</a></li>
      <li class="navbar__item"><a class="navbar__link" href="./contact.html">Contact</a></li>
      <li class="navbar__item"><a class="navbar__link" href="./login.html">Login</a></li>
    </ul>
  </nav>

  <main class="main">
    <section class="cart">
      <h1 class="cart__title">Your Cart</h1>

      <div class="cart__item">
        <div class="cart__item-main">
          <div class="cart__item-media">
            <img class="cart__item-image" src="./assets/images/product.png" alt="Product image" width="150" height="150" />
          </div>
          <div class="cart__item-details">
            <h2 class="cart__item-title">Product Name</h2>
            <p class="cart__item-desc">Lorem ipsum dolor sit amet...</p>
            <div class="cart__item-qty">
              <button class="cart__item-qty-btn" aria-label="Decrease quantity">-</button>
              <span class="cart__item-qty-value">1</span>
              <button class="cart__item-qty-btn" aria-label="Increase quantity">+</button>
            </div>
          </div>
        </div>
        <div class="cart__item-side">
          <button class="cart__item-remove" aria-label="Remove item">Trash</button>
          <p class="cart__item-price">$40</p>
        </div>
      </div>

      <aside class="cart__summary">
        <div class="cart__summary-box">
          <h2 class="cart__summary-title">Cart Summary</h2>
          <p class="cart__summary-row">Subtotal: <span class="cart__summary-value">$35</span></p>
          <p class="cart__summary-row">Shipping: <span class="cart__summary-value">$0</span></p>
          <p class="cart__summary-row">Discount: <span class="cart__summary-value">$0</span></p>
          <p class="cart__summary-row">Tax: <span class="cart__summary-value">$0</span></p>
        </div>
        <hr class="cart__summary-divider" />
        <div class="cart__summary-total-row">
          <p class="cart__summary-total">Total: <span class="cart__summary-value">$35</span></p>
          <a class="cart__summary-cta" href="./checkout.html">Check Out</a>
        </div>
      </aside>
    </section>
  </main>

  <footer class="footer">
    <p class="footer__copy">&copy; The Falcons</p>
    <ul class="footer__social">
      <li class="footer__social-item"><a class="footer__social-link" href="#">Facebook</a></li>
      <li class="footer__social-item"><a class="footer__social-link" href="#">X</a></li>
      <li class="footer__social-item"><a class="footer__social-link" href="#">Instagram</a></li>
      <li class="footer__social-item"><a class="footer__social-link" href="#">TikTok</a></li>
    </ul>
  </footer>
</body>
</html>
```

---

**Usage:**
- Apply this BEM + kebab-case pattern consistently for **every HTML page**.
- Adapt the block name (`cart`, `checkout`, `navbar`, etc.) as needed per section.
- Keep all element and modifier naming patterns consistent across the codebase.

