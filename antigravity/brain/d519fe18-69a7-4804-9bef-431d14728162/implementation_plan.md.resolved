# Add Delete Menu Item Option

## Goal
Enable the user to delete menu items from the Menu Manager interface.

## Proposed Changes

### Backend
#### [MODIFY] [route.ts](file:///c:/cafe/src/app/api/menu/route.ts)
- Add a `DELETE` method.
- The method will accept an `id` via query parameters (e.g., `DELETE /api/menu?id=123`).
- It will delete the record from the database using Prisma.

### Frontend
#### [MODIFY] [menu-manager.tsx](file:///c:/cafe/src/components/menu-manager/menu-manager.tsx)
-   Add state to hold the list of `menuItems`.
-   Fetch menu items on component mount and after adding/deleting items.
-   Display the list of menu items (Name, Price, Category) below the "Add Menu Item" form.
-   Add a "Delete" button for each item.
-   Implement `handleDelete` to call the DELETE API.

## Verification Plan

### Manual Verification
1.  Open the Menu Manager page.
2.  Add a new test item (e.g., "Test Delete Me").
3.  Verify the item appears in the list.
4.  Click "Delete" on the test item.
5.  Verify the item is removed from the list.
6.  Refresh the page to ensure persistence.
