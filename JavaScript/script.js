const app = new Vue({
  el: '#app',
  data: () => {
    return {
      page: 'home',
      cart: [],
      search: '',
      sortBy: 'subject',
      sortDirection: 'asc',
      products: products,
      checkout: [],
      order: {
        name: '',
        email: '',
        address: '',
        zip: '',
        state: '',
        method: 'Home',
        gift: false,
        number: '',
      },
      states: {
        AUH: 'Abu Dhabi',
        AJM: 'Ajman',
        DXB: 'Dubai',
        FUJ: 'Fujairah',
        RAK: 'Ras Al Khaimah',
        SHJ: 'Sharjah',
        UMM: 'Umm Al Quwain',
      },
      sortByOptions: {
        direction: '',
        type: '',
      },
      showDrawer: false,
      flag3: false,
      showCart: false
    };

  },

  methods: {
    addToCart(product) {
      this.$emit("addItemToCart", product);
      console.log(product.id);
      if (!this.cart.includes(product)) {
        this.cart.push(product);
      }
      else
        console.log("Product exists in cart");
      product.cartquantity++;


      Swal.fire(
        'Added to Cart!',
        (product.subject + ' has been added to your cart!'),
        'success'
      )
      this.products.forEach((item) => {
        if (item.id === product.id) {
          item.space -= 1;
        }
      }
      )
    },


    removeFromCart(product) {
      console.log("Removed product  " + product.id);
      if (product.cartquantity === 1) {
        this.cart.splice(product, 1);
        product.cartquantity = 0;
      }
      else {
        product.cartquantity--;
        console.log("cartquantity: " + product.cartquantity);
      }
      Swal.fire(
        'Removed from Cart!',
        (product.subject + ' has been removed from your cart!'),
        'warning'
      )
      this.products.forEach((item) => {
        if (item.id === product.id) {
          item.space += 1;
        }
      }
      )
    },

    navigateTo(page) {
      this.page = page;
      console.log(this.page);
    },

    spaceCount(product) {
      if (product.space > 0) {
        return true;
      } else {
        return false;
      }
    },

    onSubmitCheckout: function () {
      if (this.order.name && this.order.email && this.order.address && this.order.zip && this.order.state) {
        this.checkout.push(this.order);
        this.order = {
          name: '',
          email: '',
          address: '',
          zip: '',
          state: '',
          method: 'Home',
          gift: false,
        };
        Swal.fire(
          'Order Submitted!',
          'Your order has been submitted!',
          'success'
        )
        this.cart = [];
        this.navigateTo('products');
      } else {
        Swal.fire(
          'Missing Fields?',
          'Please Make Sure all fields are filled out',
          'error'
        )
        this.page = 'checkout';
      }
    },

    checkoutCart() {
      if (this.cart.length > 0) {
        this.page = "checkout";
      } else {
        Swal.fire(
          'Empty Cart?',
          'Add something from the store first!',
          'question'
        )
      }
    },

    sortProducts() {
      if (this.sortByOptions.type == "price") {
        return this.products.sort((a, b) => {
          if (this.sortByOptions.direction == "asc") {
            return a.price - b.price;
          } else if (this.sortByOptions.direction == "desc") {
            return b.price - a.price;
          }
      });
      } else if (this.sortByOptions.type == "subject") {
        return this.products.sort((a, b) => {
          if (this.sortByOptions.direction == "asc") {
            return a.subject.localeCompare(b.subject);
          }
          else if (this.sortByOptions.direction == "desc") {
            return b.subject.localeCompare(a.subject);
          }
        });
      } else if (this.sortByOptions.type == "space") {
          return this.products.sort((a, b) => {
          if (this.sortByOptions.direction == "asc") {
            return a.space - b.space;
          }
          else if (this.sortByOptions.direction == "desc") {
            return b.space - a.space;
          }
      });
      } else if (this.sortByOptions.type == "location") {
          return this.products.sort((a, b) => {
          if (this.sortByOptions.direction == "asc") {
            return a.location.localeCompare(b.location);
          }
          else if (this.sortByOptions.direction == "desc") {
            return b.location.localeCompare(a.location);
          }
      });
      }
    },

    toggleCart(show) {
      this.showCart = show;
    },
    
    toggleDrawer(show) {
      this.showDrawer = show;
    },

  },
  computed: {
    filteredProducts() {
      if (this.search) {
        return this.products.filter((product) => {
          return product.subject.toLowerCase().includes(this.search.toLowerCase()) || product.location.toLowerCase().includes(this.search.toLowerCase());

        })
      }
      else {
        return this.products;
      }
    },

    cartTotal() {
      let total = 0;
      this.cart.forEach((item) => {
        total += item.price * item.cartquantity;
      });
      console.log(total);
      return total;
    },

    cartCount() {
      let count = 0;
      this.cart.forEach((item) => {
        count += item.cartquantity;
      });
      console.log(count);
      return count;
    },
  },



});

