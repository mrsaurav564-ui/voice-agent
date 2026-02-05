# Delete Menu Items Walkthrough

I have added the ability to delete menu items from the Menu Manager.

## Changes

### 1. API Update
Added a `DELETE` endpoint to `src/app/api/menu/route.ts` that accepts an `id` query parameter.

### 2. Frontend Update
Updated `src/components/menu-manager/menu-manager.tsx` to:
-   Fetch and display the list of existing menu items.
-   Add a "Delete" button (Trash icon) next to each item.
-   Refresh the list automatically after adding or deleting an item.

## How to Verify

1.  Navigate to the **Menu Manager** page in your application.
2.  You should see a new section **"Existing Menu Items"** below the "Add Menu Item" form.
3.  **Add a Test Item**:
    -   Fill in the form with dummy data (e.g., name: "Delete Me", price: 100).
    -   Click "Add Item".
    -   Verify that "Delete Me" appears in the list below.
4.  **Delete the Item**:
    -   Click the **Trash Icon** next to "Delete Me".
    -   Confirm the deletion in the browser popup.
    -   Verify that the item disappears from the list.
