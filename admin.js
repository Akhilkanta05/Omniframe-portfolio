document.addEventListener('DOMContentLoaded', () => {
    // Check if Firebase config is set


    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const loginForm = document.getElementById('login-form');
    const uploadForm = document.getElementById('upload-form');
    const logoutBtn = document.getElementById('logout-btn');
    const loginError = document.getElementById('login-error');
    const uploadStatus = document.getElementById('upload-status');
    const galleryList = document.getElementById('admin-gallery-list');
    const adminNameSpan = document.getElementById('admin-name');

    // Auth State Observer
    auth.onAuthStateChanged((user) => {
        if (user) {
            showDashboard(user.email);
        } else {
            showLogin();
        }
    });

    function showLogin() {
        loginSection.style.display = 'block';
        dashboardSection.style.display = 'none';
        galleryList.innerHTML = ''; // Clear sensitive data
    }

    function showDashboard(email) {
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        if (email) adminNameSpan.textContent = email;
        loadImages();
    }

    // Drag and Drop Logic
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('image-file');
    const imagePreview = document.getElementById('image-preview');

    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');

        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileSelect(fileInput.files[0]);
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            handleFileSelect(fileInput.files[0]);
        }
    });

    function handleFileSelect(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
                dropZone.querySelector('p').textContent = `✅ ${file.name}`;
            };
            reader.readAsDataURL(file);
        }
    }

    // Login Handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        loginError.textContent = 'Logging in...';

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                loginError.textContent = '';
                loginForm.reset();
                console.log("Login successful");
                // onAuthStateChanged will handle the UI switch
            })
            .catch((error) => {
                console.error("Login Error:", error);
                loginError.textContent = error.message;
            });
    });

    // Upload Handler
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const file = fileInput.files[0];

        if (!file) {
            alert('Please select an image first!');
            return;
        }

        uploadStatus.textContent = 'Uploading...';
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;

        // 1. Upload to Firebase Storage
        const storageRef = storage.ref(`images/${Date.now()}_${file.name}`);
        const uploadTask = storageRef.put(file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploadStatus.textContent = `Upload is ${Math.round(progress)}% done`;
            },
            (error) => {
                console.error("Storage Error:", error);
                uploadStatus.textContent = 'Upload failed: ' + error.message;
                uploadStatus.style.color = 'red';
            },
            () => {
                // 2. Get URL and Save to Firestore
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    db.collection("images").add({
                        filename: file.name,
                        url: downloadURL,
                        category: category,
                        description: description,
                        uploadDate: firebase.firestore.FieldValue.serverTimestamp()
                    })
                        .then(() => {
                            uploadStatus.textContent = 'Upload Successful!';
                            uploadStatus.style.color = 'green';
                            uploadForm.reset();
                            imagePreview.style.display = 'none';
                            dropZone.querySelector('p').innerHTML = '📂 Drag & Drop your image here<br>or click to browse';
                            loadImages();
                            setTimeout(() => uploadStatus.textContent = '', 3000);
                        })
                        .catch((error) => {
                            console.error("Firestore Error: ", error);
                            uploadStatus.textContent = 'Database error: ' + error.message;
                        });
                });
            }
        );
    });

    // Load Images from Firestore
    function loadImages() {
        db.collection("images").orderBy("uploadDate", "desc").get()
            .then((querySnapshot) => {
                galleryList.innerHTML = '';
                querySnapshot.forEach((doc) => {
                    const img = doc.data();
                    const item = document.createElement('div');
                    item.className = 'image-item';
                    item.innerHTML = `
                    <img src="${img.url}" alt="${img.category}">
                    <div class="image-info">
                        <strong>${img.category}</strong><br>
                        <small>${img.description || 'No description'}</small>
                    </div>
                    <button class="delete-btn" data-id="${doc.id}" data-url="${img.url}">Delete</button>
                `;
                    galleryList.appendChild(item);
                });

                // Add delete listeners
                document.querySelectorAll('.delete-btn').forEach(btn => {
                    btn.addEventListener('click', deleteImage);
                });
            })
            .catch((error) => {
                console.error("Error getting documents: ", error);
            });
    }

    function deleteImage(e) {
        if (!confirm('Are you sure you want to delete this image?')) return;

        const docId = e.target.getAttribute('data-id');
        const fileUrl = e.target.getAttribute('data-url');

        // 1. Delete from Firestore
        db.collection("images").doc(docId).delete().then(() => {
            // 2. Delete from Storage (Optional but recommended)
            // Extract path from URL roughly or store specific path reference is better
            // Ideally we store storageRef path in DB. For now, we skip strict storage cleanup or try to parse
            try {
                const fileRef = storage.refFromURL(fileUrl);
                fileRef.delete().catch(err => console.log('Storage delete error', err));
            } catch (err) {
                console.log('Could not get ref from url', err);
            }

            loadImages();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
});
