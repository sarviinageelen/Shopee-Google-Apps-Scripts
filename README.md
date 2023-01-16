Overview
--------

This script creates a custom menu in Google Sheets with two options, "Get JSON" and "Delete Sheets". The script calls the Shopee API to extract promotion IDs and session names, creates new sheets with session names, calls the API again using the promotion IDs as a parameter to extract item IDs, and logs the data in the sheets.

Usage
-----

-   Open the Google Sheet where you want to add the custom menu
-   Go to "Tools" -> "Script Editor"
-   Replace the existing code with the provided script
-   Save the script and give it a name
-   Refresh the sheet, you should now see a new menu "Shocking Sale" with options "Get JSON" and "Delete Sheets"
-   Click on "Get JSON" to extract the data and create new sheets
-   Check the newly created sheets to view the logged data
-   Use "Delete Sheets" option to delete all the sheets created by the script

Note
----

-   The script has been written to extract data from the Shopee API specific endpoint, you may need to update the script to extract data from a different endpoint.
-   It is necessary to have a sheet named "Template" in the same spreadsheet.
