Shopee-Google-Apps-Scripts
==========================

This script is designed to work with Google Sheets, and adds a custom menu to the sheet with two options: "Get JSON" and "Delete Sheets".

When "Get JSON" is clicked, the script performs the following actions:

-   Retrieves the active spreadsheet and all sheets within it.
-   Fetches a JSON file from the website "<https://shopee.com.my/api/v2/flash_sale/get_all_sessions>" and stores it in a variable named "promotionIdJson".
-   Extracts the promotion IDs from the JSON file and stores them in a variable named "promotionId".
-   Logs the promotion IDs in the logs.
-   Extracts the session names from the JSON file and stores them in a variable named "sessionName".
-   Loops through all the promotion IDs and session names.
-   For each promotion ID, it checks if a sheet with the same name as the session name already exists. If it doesn't, it creates a new sheet and names it with the session name.
-   Retrieves another JSON file from the website using the promotion ID as a parameter.
-   Extracts the item IDs from this new JSON file and stores them in a variable named "itemDataTemp".
-   Breaks down the item IDs into groups of 50 and stores them in a variable named "itemData".
-   Loops through each group of item IDs and makes a new API call to get additional data for each item ID.
-   Logs the returned data in the logs.
-   Formats the data and prints it to the sheet.

The "Delete Sheets" option allows the user to delete all the sheets that have been created by the script.
