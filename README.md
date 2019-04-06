# bamazon

This project creates two command line interfaces to access your bamazan database.

The first command line interface is the Bamazon customer interface.  The interace is accessed with the
command line: node bamazoncustomer.js.  The initial view will show the current inventory of your Bamazon
outlet.  The information shown for each product will be:

* index - The index of the product
* product_name - The name description of this product
* deparment_name - The department this product is sold through
* price - The cost for the purchase of one of this product
* stock_quantity - How many of this item that this store has in stock

https://github.com/kriley314/bamazon/blob/master/initialScreen.jpg

The user now has the opportunity to purchase any of the items from the inventory.  The interface allows
the user to scroll through the product list with the cursor keys or to enter the number shown in the 
interface selection list for the desired product.  Important note:  The index shown in the inventory
list (0 based) is offset from the index in the selection list (1 based).

When the user purchases instances of a product, the inventory count will be decreased by the number of
items purchased and the user will be shown the total purchase price.

https://github.com/kriley314/bamazon/blob/master/purchaseScreen.jpg

If the user requests to purchase a quantity of a given product which is greater than the number of that 
item that we have in stock, the message, "Unfortunately we dpn't have that many in stock - we can only
sell you <stock quantity> at the moment."  <stock quantity> will be replaced with the actual number of
items in stock.

https://github.com/kriley314/bamazon/blob/master/insufficientStock.jpg

Following the completion of each user sequence, the inventory table will be shown with current/updated
totals.

The second command line interface is the Bamazon manager interface.  The interace is accessed with the
command line: node bamazonmanager.js.  The initial view will simply be a menu of options given to the
mnager through th interface.  The menu options for the manager are:

* View Products
* View Low Inventory
* Add Inventory
* Add a Product
* Exit

https://github.com/kriley314/bamazon/blob/master/bamazonManager.jpg

The [View Products] menu option will show the manager the current inventory for this branch of the Bamazon empire.

https://github.com/kriley314/bamazon/blob/master/bmViewProducts.jpg

The [View Low Inventory] menu option will show the manager the focused inventory list where only products - and
their associated information - that have an inventory stock of less than 10 items will be shown.

https://github.com/kriley314/bamazon/blob/master/bmLowInventory.jpg

The [Add Inventory] menu option allows the manager to purchase additional items of current product offerings so they
can stock up for the upcoming season rush on projected sales.

https://github.com/kriley314/bamazon/blob/master/bmAddInventory.jpg

As a test case, we added inventory for one of the items that HAD been shown in the Low Inventory screen, and now
should NOT be shown in that view.

https://github.com/kriley314/bamazon/blob/master/bmUpdatedLowInventory.jpg

The [Add a Product] menu option allows the manager to select a new product to add into the inventory for this store.
The manager will enter all the relevant information for the product - the name, the department this product will be
sold though, the sales price for this product, and the number of products that will be purchased to provide this
store with this level of inventory.

https://github.com/kriley314/bamazon/blob/master/bmAddAProduct.jpg

Thanks you for your time and I hope you enjoy using this application!!
