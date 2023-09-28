        // Disable right-click context menu
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });

        // Disable copy-paste
        document.addEventListener('copy', function (e) {
            e.preventDefault();
        });

        document.addEventListener('paste', function (e) {
            e.preventDefault();
        });

        // Disable keyboard shortcuts (Ctrl+C, Ctrl+X, Ctrl+V)
        document.addEventListener('keydown', function (e) {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'x' || e.key === 'v')) {
                e.preventDefault();
            }
        });

        // Turn on the camera if available
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    // Camera access successful; do nothing
                })
                .catch(function (error) {
                    // Camera access denied or not available; close the window
                    alert('Camera access denied or not available. The exam session will be closed.');
                    window.close();
                });
        }

        // Detect if the user is on a mobile device and close the window
        if (/Mobi/.test(navigator.userAgent)) {
            alert('Mobile device detected. The exam session will be closed.');
            window.close();
        }

        // Track tab switches and show a warning alert
        let tabSwitchCount = 0;
        window.onblur = function () {
            tabSwitchCount++;
            if (tabSwitchCount === 1) {
                alert('Warning: You have switched tabs. Please return to the exam tab.');
            } else if (tabSwitchCount >= 2) {
                alert('You switched tabs multiple times. The exam session will be closed.');
                window.close();
            }
        };

        // Restrict opening new tabs or windows
        window.onbeforeunload = function () {
            return "Are you sure you want to leave this exam?";
        };
