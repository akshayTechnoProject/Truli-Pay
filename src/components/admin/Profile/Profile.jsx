import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Loader from '../include/Loader';
import Menu from '../include/Menu';
import Footer from '../include/Footer';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';

export default function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log('>>>>>>>>>', user?.email);
  const [change, setChange] = useState(true);

  useEffect(() => {
    document.getElementById('page-loader').style.display = 'none';
    var element = document.getElementById('page-container');
    element.classList.add('show');
  }, [change]);

  const [img, setImg] = useState({
    src: '',
    alt: '',
  });
  const [profileInfo, setProfileInfo] = useState({
    name: localStorage.getItem('DM_Admin_NAME'),
    image: localStorage.getItem('DM_Admin_IMAGE'),
  });
  const [addPicture, setAddPicture] = useState(false);
  const [isPicUpload, setIsPicUpload] = useState(false);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState();
  const [passErrors, setPassErrors] = useState({});
  const [disable, setDisable] = useState(false);
  const [disable1, setDisable1] = useState(false);
  const initialValues = {
    old_password: '',
    new_password: '',
    confirm_password: '',
  };
  const [password, setPassword] = useState(initialValues);

  const handleImg = (e) => {
    setDisable(true);
    if (e.target.files[0]) {
      const newImage = e.target.files[0];
      setProfileInfo({ ...profileInfo, [image]: newImage });

      const file = e.target.files[0];
      const storage = getStorage();
      const reference = ref(
        storage,
        `profile-image/profilePic_${new Date().getTime()}.jpg`
      );
      const metadata = {
        contentType: 'image/jpeg',
      };
      uploadBytes(reference, file, metadata)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then(async (downloadURL) => {
          console.log(downloadURL);
          if (file) {
            setImg({
              src: downloadURL,
              alt: e.target.files[0].name,
            });
          }
          setImage(downloadURL);
          setIsPicUpload(true);
          setDisable(false);
        })
        .catch(() => {
          setDisable(false);
          toast.error('Something went wrong!');
          console.log('Something went wrong!');
          setChange(!change);
        });
    }
  };
  const InputEvent = (e) => {
    const newProfileInfo = { ...profileInfo };
    newProfileInfo[e.target.name] = e.target.value;
    setProfileInfo(newProfileInfo);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (validate()) {
      setDisable(true);
      const updateId = localStorage.getItem('DM_Admin_EMAIL');
      if (isPicUpload) {
        const adminRef = doc(db, 'admin', updateId);
        await updateDoc(adminRef, { name: profileInfo.name, image: image })
          .then(() => {
            localStorage.setItem('DM_Admin_NAME', profileInfo.name);
            localStorage.setItem('DM_Admin_IMAGE', image);
            toast.success('Profile Updated Successfully');
            setDisable(false);
            setImage();
            setIsPicUpload(false);
            setChange(!change);
            // updateId = '';
          })
          .catch((error) => {
            toast.error('Something went wrong!');
            console.log(error);
            setDisable(false);
            setIsPicUpload(false);
            // updateId = '';
          });
      } else {
        const adminRef = doc(db, 'admin', updateId);
        await updateDoc(adminRef, { name: profileInfo.name })
          .then(() => {
            localStorage.setItem('DM_Admin_NAME', profileInfo.name);
            toast.success('Profile Updated Successfully');
            setDisable(false);
            setIsPicUpload(false);
            setChange(!change);
          })
          .catch((error) => {
            toast.error('Something went wrong!');
            console.log(error);
            setDisable(false);
            setIsPicUpload(false);
          });
      }
    }
  };

  const validate = () => {
    let input = profileInfo;

    let errors = {};
    let isValid = true;

    if (!input['name']) {
      isValid = false;
      errors['name_err'] = 'Please enter name';
    }

    setErrors(errors);
    return isValid;
  };

  const changePassword = (event) => {
    const { name, value } = event.target;
    setPassword({ ...password, [name]: value });
  };

  const validatePass = async () => {
    let input = password;

    let passErrors = {};
    let isValidPass = true;

    if (!input['old_password']) {
      isValidPass = false;
      passErrors['old_password'] = 'Please enter old password.';
    } else {
      if (!input['new_password']) {
        isValidPass = false;
        passErrors['new_password'] = 'Please enter new password.';
      } else if (!input['confirm_password']) {
        isValidPass = false;
        passErrors['confirm_password'] = 'Please enter confirm password.';
      } else if (
        input['new_password'] != '' &&
        input['confirm_password'] != ''
      ) {
        if (input['new_password'] != input['confirm_password']) {
          isValidPass = false;
          passErrors['password_error'] =
            'New password and confirm password are not same.';
        }
      }
    }

    setPassErrors(passErrors);

    return isValidPass;
  };

  const changePass = async (e) => {
    e.preventDefault();
    setDisable1(true);
    let validate = await validatePass();
    if (validate) {
      const credential = EmailAuthProvider.credential(
        user.email,
        password.old_password
      );
      // User re-authenticated.
      reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, password.new_password)
            .then(() => {
              setDisable1(false);
              toast.success('Password Updated Successfully.');
              console.log('Password updated successfully');
              setChange(!change);
              setPassword(initialValues);
              setPassErrors({});
            })
            .catch((error) => {
              console.log('Errors', error.message);
              setDisable1(false);
              if (
                error?.message?.match(
                  'Password should be at least 6 characters'
                )
              ) {
                toast.error('Password should be at least 6 characters');
              } else
                toast.error('Something went wrong. Please try again later.');
            });
        })
        .catch((error) => {
          console.log(':: ', error);
          setDisable1(false);
          toast.error('Invalid Inputs! ');
        });
    } else {
      setDisable1(false);
    }
  };

  return (
    <>
      <Loader />

      <div
        id="page-container"
        className="fade page-sidebar-fixed page-header-fixed"
      >
        <Menu />

        <div id="content" className="content">
          <ol className="breadcrumb float-xl-right">
            <li className="breadcrumb-item">
              <NavLink to="/dashboard">
                <span className="basePath">Dashboard</span>
              </NavLink>
            </li>
            <li className="breadcrumb-item active currentPath">Profile</li>
          </ol>
          <h1 className="page-header">Profile</h1>

          <div className="row">
            <div className="col-xl-6 p-5">
              <div
                className="card "
                style={{
                  height: 'auto',
                  padding: '20px',
                  borderRadius: '20px',
                }}
              >
                <div className="mx-auto">
                  <h3 class="card-title mx-auto" style={{ color: '#231549' }}>
                    Profile Setting
                  </h3>
                </div>
                <form
                  onSubmit={(e) => submitHandler(e)}
                  className="profileForm"
                >
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                      Name:
                    </label>

                    <input
                      type="text"
                      className="form-control ml-0"
                      id="exampleInputName"
                      placeholder="Enter name here.."
                      name="name"
                      value={profileInfo.name}
                      onChange={InputEvent}
                    />
                    <div className="text-danger">{errors.name_err}</div>
                  </div>

                  <div className="mb-3">
                    <label for="exampleInputImage">Image: </label>
                    {console.log(profileInfo)}
                    {profileInfo.image != '' ? (
                      <img
                        src={localStorage.getItem('DM_Admin_IMAGE')}
                        className="form-img__img-preview ml-2"
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '10px',
                        }}
                        alt="Profile_Picture"
                      />
                    ) : (
                      <>
                        <img
                          src={'/assets/img/icon/profile-icon.png'}
                          alt="ProfileImage"
                          className="form-img__img-preview ml-2"
                          style={{
                            width: '100px',
                            height: '100px',
                            margin: '10px',
                          }}
                        />
                      </>
                    )}

                    <br />

                    <input
                      type="file"
                      className="form-control imgInput ml-0"
                      id="exampleInputImage"
                      onChange={handleImg}
                      accept="image/png, image/gif, image/jpeg"
                    />
                    {img.src != '' ? (
                      <img
                        src={img.src}
                        className="form-img__img-preview"
                        style={{ width: '84px', height: '84px' }}
                        alt="imgs"
                      />
                    ) : (
                      ''
                    )}
                    <div className="text-danger">{errors.img_err}</div>
                  </div>
                  <button
                    type="submit"
                    className="btn m-r-5"
                    disabled={disable}
                    style={{
                      borderRadius: '20px',
                      backgroundColor: '#231549',
                      color: '#fff',
                    }}
                  >
                    {disable ? 'Processing...' : 'Submit'}
                  </button>
                  <button
                    type="reset"
                    className="btn "
                    value="Reset"
                    onClick={(e) => {
                      setAddPicture(false);
                      setImg({ src: '', alt: '' });
                    }}
                    style={{
                      borderRadius: '20px',
                      border: '1px solid #231549',
                      color: '#231549',
                      backgroundColor: '#fff4ee',
                    }}
                  >
                    Reset
                  </button>
                </form>
              </div>
            </div>

            <div className="col-xl-6 p-5">
              <div
                className="card "
                style={{
                  height: 'auto',
                  padding: '20px',
                  borderRadius: '20px',
                }}
              >
                <div className="mx-auto">
                  <h3 class="card-title mx-auto" style={{ color: '#231549' }}>
                    Change Password
                  </h3>
                </div>
                <form onSubmit={changePass} className="changePassForm">
                  <div className="mb-3">
                    <label for="exampleInputOldPass">Old Password:</label>
                    <input
                      type="password"
                      className="form-control ml-0"
                      id="exampleInputOldPass"
                      placeholder="Enter Old Password"
                      name="old_password"
                      value={password.old_password}
                      onChange={changePassword}
                    />
                    <div className="text-danger ">
                      {passErrors.old_password}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label for="exampleInputNewPass">New Password:</label>
                    <input
                      type="password"
                      className="form-control ml-0"
                      id="exampleInputNewPass"
                      placeholder="Enter New Password"
                      name="new_password"
                      value={password.new_password}
                      onChange={changePassword}
                    />
                    <div className="text-danger ">
                      {passErrors.new_password}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputConfirmPass">
                      Confirm Password:
                    </label>
                    <input
                      type="password"
                      className="form-control ml-0"
                      id="exampleInputConfirmPass"
                      placeholder="Enter Confirm Password"
                      name="confirm_password"
                      value={password.confirm_password}
                      onChange={changePassword}
                    />
                    <div className="text-danger ">
                      {passErrors.confirm_password}
                    </div>
                    <div className="text-danger ">
                      {passErrors.password_error}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn m-r-5"
                    disabled={disable1}
                    style={{
                      borderRadius: '20px',
                      backgroundColor: '#231549',
                      color: '#fff',
                    }}
                  >
                    {disable1 ? 'Processing...' : 'Submit'}
                  </button>
                  <button
                    type="reset"
                    className="btn "
                    value="Reset"
                    onClick={(e) => {
                      setPassword(initialValues);
                      setPassErrors({});
                    }}
                    style={{
                      borderRadius: '20px',
                      border: '1px solid #231549',
                      color: '#231549',
                      backgroundColor: '#fff4ee',
                    }}
                  >
                    Reset
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
