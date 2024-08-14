document.addEventListener('DOMContentLoaded', function () {
    const reloadButton = document.getElementById('reloadButton');
    const organizeButton = document.getElementById('organizeButton');
    const folderSelect = document.getElementById('folderSelect');
    const searchBox = document.getElementById('searchBox');
    const status = document.getElementById('status');
    const createFoldersCheckbox = document.getElementById('createFoldersCheckbox');
    const thresholdInput = document.getElementById('thresholdInput');

    let selectedFolderId = null;

    // Load folders when the extension is opened
    function loadFolders() {
        chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
            populateFolderSelect(bookmarkTreeNodes);
        });
    }

    loadFolders();

    reloadButton.addEventListener('click', loadFolders);

    folderSelect.addEventListener('change', function () {
        selectedFolderId = folderSelect.value;
        document.getElementById('selectedFolder').textContent = `Selected Folder: ${folderSelect.options[folderSelect.selectedIndex].text}`;
        organizeButton.disabled = !selectedFolderId; // Enable button only if a folder is selected
    });

    organizeButton.addEventListener('click', function () {
        if (selectedFolderId) {
            status.textContent = "Organizing bookmarks...";
            chrome.bookmarks.getSubTree(selectedFolderId, function (bookmarkTreeNodes) {
                organizeAndSortBookmarks(bookmarkTreeNodes[0].children);
            });
        } else {
            status.textContent = "Please select a folder to organize.";
        }
    });

    searchBox.addEventListener('input', function () {
        const query = searchBox.value.toLowerCase();
        const options = folderSelect.options;

        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            const text = option.textContent.toLowerCase();
            option.style.display = text.includes(query) ? '' : 'none';
        }
    });

    createFoldersCheckbox.addEventListener('change', function () {
        thresholdInput.disabled = !createFoldersCheckbox.checked;
    });

    function populateFolderSelect(bookmarkTreeNodes) {
        folderSelect.innerHTML = '';
        bookmarkTreeNodes.forEach(function (node) {
            if (node.children) {
                addFolderOption(node, "");
            }
        });
    }

    function addFolderOption(node, prefix) {
        if (node.title) {
            let option = document.createElement('option');
            option.value = node.id;
            option.textContent = prefix + node.title;
            folderSelect.appendChild(option);
        }

        if (node.children) {
            node.children.forEach(function (child) {
                if (child.children && child.children.length > 0) {
                    addFolderOption(child, prefix + "- ");
                }
            });
        }
    }

    function organizeAndSortBookmarks(bookmarks) {
        let urlMap = {};

        bookmarks.forEach(function (bookmark) {
            if (bookmark.children && bookmark.children.length > 0) {
                organizeAndSortBookmarks(bookmark.children);
            } else if (bookmark.url) {
                let domain = (new URL(bookmark.url)).hostname;
                if (!urlMap[domain]) {
                    urlMap[domain] = [];
                }
                urlMap[domain].push(bookmark);
            }
        });

        let sortedDomains = Object.keys(urlMap).sort();
        let threshold = parseInt(thresholdInput.value) || 1;

        let index = 0;
        sortedDomains.forEach(function (domain) {
            let bookmarks = urlMap[domain];
            bookmarks.sort((a, b) => a.title.localeCompare(b.title));

            if (createFoldersCheckbox.checked && bookmarks.length >= threshold) {
                chrome.bookmarks.create({ title: domain, parentId: selectedFolderId }, function (newFolder) {
                    bookmarks.forEach(function (bookmark, i) {
                        chrome.bookmarks.move(bookmark.id, { parentId: newFolder.id, index: i });
                    });
                });
            } else {
                bookmarks.forEach(function (bookmark) {
                    chrome.bookmarks.move(bookmark.id, { parentId: selectedFolderId, index: index });
                    index++;
                });
            }
        });

        status.textContent = "Bookmarks organized and sorted successfully!";
    }
});
