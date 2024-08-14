# Bookmarks Organizer Extension

A Chrome Extension designed to help you organize your bookmarks more efficiently. This extension allows you to sort selected bookmark folders alphabetically, place subfolders at the top, and offers several additional features to manage and clean up your bookmarks. While this extension has been tested on Microsoft Edge, it should also work on other Chromium-based browsers.

![Ekran görüntüsü 2024-08-15 011907](https://github.com/user-attachments/assets/59c1c568-592b-44b6-81a9-31d45ee43122)

## Features
- **Basic Organization:** Sorts the folders and bookmarks within the selected bookmark folder alphabetically; placing folders at the top and bookmarks below. Within the bookmarks, it also groups those from the same domain together and sorts them alphabetically by title.
- **Domain-Based Folder Creation:** Automatically creates a new folder for a domain if the number of bookmarks from that domain exceeds the specified threshold. This feature is activated when the "Auto Folder Creation" option is checked and a threshold value is set.
- **Merge and Organize Subfolder Bookmarks:** Moves bookmarks from subfolders within the selected folder to the main selected folder. This process organizes the content of subfolders into the main folder. This feature is enabled when the "Include Subfolders" option is checked.
- **Subfolder Organization:** Organizes the contents of subfolders within the selected folder as well as the selected folder itself. This feature is activated when the "Organize Subfolders" option is checked, providing more comprehensive organization.

## Installation

1. Clone or download this repository.
2. Open Chrome/Edge and navigate to `chrome://extensions/` or `edge://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the folder containing your extension files.
5. The extension should now appear in your browser's extensions list.

## Usage

1. Open your bookmarks manager.
2. Use the extension interface to select the folder you wish to organize.
3. **Include Subfolders (Optional):** To move and organize bookmarks from subfolders into the main folder, check the "Include Subfolders" option.
4. **Domain-Based Folder Creation (Optional):** To automatically create folders for domains when the number of bookmarks from a specific domain exceeds a set threshold, check the "Automatic Folder Creation" option and set the threshold value.
5. **Organize Subfolders (Optional):** To also organize the contents of subfolders within the selected folder, check the "Organize Subfolders" option.
6. Click the "Organize Selected Folder" button to start the organization process.
7. The status message will update once the organization process is complete.

## Compatibility

- **Tested on:** Microsoft Edge.
- **Expected to work on:** Other Chromium-based browsers (e.g., Google Chrome, Opera), though further testing is recommended.

## Contributing

If you find any bugs or have suggestions for improvements, please feel free to open an issue or submit a pull request. Contributions are always welcome!

## Screenshots

Here are some screenshots of the extension in action:

### Before:

![2](https://github.com/user-attachments/assets/acb6c49d-3ff2-4fa4-abfe-0da107018e8e)

### After:

![3](https://github.com/user-attachments/assets/c820fb86-1e7a-428b-9878-258b801db3b0)

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for more details.
