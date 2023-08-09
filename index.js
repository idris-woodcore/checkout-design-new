var BASE_URL = "https://websocket.inside.poolerapp.com";

function Pooler(config) {
  // var timerText = document.createElement("span");

  // function timer() {
  //   timerText.style.textAlign = "center";
  //   timerText.style.fontFamily =
  //     '"GraphikMedium", "Source Sans Pro", sans-serif';
  //   timerText.textContent = `Expires in 30:0`;
  //   timerText.style.color = "#8F9BB2";
  //   timerText.style.fontWeight = "400";
  //   var duration = 1799;
  //   var countdown = "";
  //   var timer = setInterval(function () {
  //     var minutes = Math.floor(duration / 60);
  //     var seconds = duration % 60;
  //     countdown = minutes + ":" + seconds;
  //     if (duration <= 0) {
  //       showSessionExpirationModal(data);
  //       clearInterval(timer);
  //       clearInterval(timer);
  //       var childNodes = document.body.childNodes;
  //       var desiredChild = null;
  //       for (var i = 0; i < childNodes.length; i++) {
  //         if (childNodes[i].id === "merchant-modal") {
  //           desiredChild = childNodes[i];
  //           break;
  //         }
  //       }
  //       if (desiredChild) {
  //         var parent = desiredChild.parentNode;
  //         parent.removeChild(desiredChild);
  //         console.log("yeah");
  //       }
  //     }
  //     duration--;
  //     timerText.textContent = `Expires in ${
  //       countdown !== undefined ? countdown : ""
  //     }`;
  //   }, 1000);

  //   // modalFooter.appendChild(timerText);
  // }

  let overlay = "";

  var styles = document.createElement("style");
  var cssStyles = `
  .spinner {
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 0.5s linear infinite;
  }
  
  .spinner-small {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #261bc1;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 0.5s linear infinite;
  }
  
  .footer-text {
    position: absolute;
    top: 100%;
    left: 35%;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .spinner-centered {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
  .awaiting-container {
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
  .transferToMerchant {
    color: #000;
    text-align: center;
    font-weight: 500;
    font-size: 1rem;
  }
  .modal {
    display: block;
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
  }
  .modal-content {
    background-color: #fefefe;
    margin: auto;
    width: 25%;
    border-radius: 8px;
    position: relative;
  }
  .modal-footer {
    display: flex;
    flex-direction: column;
    width: 100%;
    /* margin-top: 1rem; */
    padding-top: 0.5rem;
    padding-bottom: 3.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .modal-text-parent {
    background-color: #e0e4f4;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom: 1px solid #e0e4f4;
    padding: 20px;
  }
  .modal-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .modal-amt-email {
    display: flex;
    flex-direction: column;
    margin-top: 0.25rem;
  }
  .modal-amt {
    font-weight: 500;
    color: #000;
    text-align: end;
    text-align: right;
    font-size: 1.125rem;
  }
  .modal-em {
    font-style: normal;
    font-size: 1rem;
    line-height: 1.25;
  }
  .modal-body {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    width: 91.6667%;
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 1.2rem;
  }
  .modal-amount-email {
    display: flex;
    flex-direction: column;
    column-gap: 5px;
  }
  .modal-email {
    color: #8f9bb2;
    font-family: "GraphikRegular", "Source Sans Pro", sans-serif;
  }
  .close {
    color: #000;
    float: right;
    margin-top: 0px;
    position: absolute;
    right: -5%;
    top: 1%;
    width: 10px;
    height: 10px;
  }
  .close-img:hover {
    background: red;
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.08),
      4px 10px 25px rgba(0, 0, 0, 0.03);
    border-radius: 13px;
    width: 10px;
    height: 10px;
    transition: all 0.8s ease-in-out;
  }
  
  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
  `;

  styles.innerHTML = cssStyles;
  overlay = document.createElement("div");

  // trigger overlay, and loader
  function payWithPooler() {
    const controller = new AbortController();
    const signal = controller.signal;

    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "row";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "1";

    var spinnerCssCode = `
  <style>
    .spinner-3 {
      width: 30px;
      aspect-ratio: 1;
      display: grid;
      border-radius: 50%;
      background:
        linear-gradient(0deg ,rgb(0 0 0/50%) 30%,#0000 0 70%,rgb(0 0 0/100%) 0) 50%/8% 100%,
        linear-gradient(90deg,rgb(0 0 0/25%) 30%,#0000 0 70%,rgb(0 0 0/75% ) 0) 50%/100% 8%;
      background-repeat: no-repeat;
      animation: s3 1s infinite steps(12);
    }
    .spinner-3::before,
    .spinner-3::after {
       content: "";
       grid-area: 1/1;
       border-radius: 50%;
       background: inherit;
       opacity: 0.915;
       transform: rotate(30deg);
    }
    .spinner-3::after {
       opacity: 0.83;
       transform: rotate(60deg);
    }
    
    @keyframes s3 {
      100% {transform: rotate(1turn)}
    }
    
  </style>
  `;
    var spinnerContainer = document.createElement("div");
    spinnerContainer.innerHTML = spinnerCssCode;
    var spinner = document.createElement("div");
    spinner.className = "spinner-3";
    overlay.appendChild(spinnerContainer);
    overlay.appendChild(spinner);
    // create iframe
    var iframe = document.createElement("iframe");
    iframe.id = "pooler-iframe";
    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.display = "flex";
    iframe.style.flexDirection = "row";
    iframe.style.justifyContent = "center";
    iframe.style.alignItems = "center";
    iframe.style.background = "transparent";

    // LOAD UP IFRAME
    function handleIframeLoad() {
      var iframeWindow = iframe.contentWindow;
      iframeWindow.document.body.appendChild(overlay);
      // LOAD PUSHER SCRIPT DYNAMICALLY AND ADD TO DOM
      const script = document.createElement("script");
      script.src = "https://js.pusher.com/8.2.0/pusher.min.js";
      script.async = true;
      script.onload = function () {
        const BASE_URL = "https://websocket.inside.poolerapp.com";
        const PUSHER_SIGN_APP_KEY = "f5715eb30d0b1b069d22";
        const PUSHER_SIGN_CHANNEL_KEY = "signature_dev";
        const PUSHER_PAYMENT_APP_KEY = "926bd1302add9e673539";
        const PUSHER_PAYMENT_CHANNEL_KEY = "initialize_dev";

        const pusherSign = new Pusher(PUSHER_SIGN_APP_KEY, {
          cluster: "mt1",
        });
        const pusherSignSubscribe = pusherSign.subscribe(
          PUSHER_SIGN_CHANNEL_KEY
        );

        const removeSubscription = () => {
          pusherSignSubscribe.unsubscribe(PUSHER_SIGN_CHANNEL_KEY);
          pusherSignSubscribe.unbind();
        };

        function getSignature(callback) {
          fetch(`${BASE_URL}/initialize`, { method: "GET", signal })
            .then()
            .catch();
          pusherSignSubscribe.bind("data", function (data) {
            if (data?.data?.signature) {
              callback(data?.data?.signature);
              removeSubscription();
            }
          });
        }
        getSignature((signature) => {
          function initialisePayment() {
            var reqObject = {
              action: "initialize",
              signature: signature,
              email: config?.email,
              amount: config?.amount,
              pub_key: config?.pub_key,
              // payment_link_reference: config?.reference,
            };

            fetch(`${BASE_URL}/socket`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              signal,
              body: JSON.stringify(reqObject),
            });

            const pusherPayment = new Pusher(PUSHER_PAYMENT_APP_KEY, {
              cluster: "mt1",
            });
            const pusherPaymentSubscribe = pusherPayment.subscribe(
              PUSHER_PAYMENT_CHANNEL_KEY
            );

            function executeOnce(fn) {
              let executed = false;

              return function (...args) {
                if (!executed) {
                  executed = true;
                  fn(...args);
                }
              };
            }
            const showMerchantModalOnce = executeOnce(showMerchantModal);

            pusherPaymentSubscribe.bind("data", (data) => {
              if (data?.data?.status === "01") {
                showMerchantModalOnce({
                  data: data?.data?.data,
                  merchantConfig: config,
                });
                handleEffect();
                removeSubscription();
                pusherPaymentSubscribe.unsubscribe(PUSHER_PAYMENT_CHANNEL_KEY);
                pusherPaymentSubscribe.unbind();
                iframe.removeEventListener("load", handleIframeLoad);
                overlay.style.backgroundColor = "transparent";
                spinner.style.display = "none";
                overlay.style.display = "none";
                iframe.style.display = "none";
                controller.abort();
              } else {
                onError(config);
                // onFailure(config);
                handleEffect();
                removeSubscription();
                pusherPaymentSubscribe.unsubscribe(PUSHER_PAYMENT_CHANNEL_KEY);
                pusherPaymentSubscribe.unbind();
                iframe.removeEventListener("load", handleIframeLoad);
                overlay.style.backgroundColor = "transparent";
                spinner.style.display = "none";
                overlay.style.display = "none";
                iframe.style.display = "none";
                controller.abort();
              }
            });
          }

          initialisePayment();
        });
      };

      document.head.appendChild(script);

      // remove listener
      // iframe.removeEventListener("load", handleIframeLoad);
    }

    iframe.addEventListener("load", handleIframeLoad);
    document.body.appendChild(iframe);
    // CHECK THE IF POOLER-IFRAME APPEARS MORE THAN ONCE IN DOM, KEEP 1 AND REMOVE THE REST
    function handleEffect() {
      var idToRemove = "pooler-iframe";
      var elementsWithId = document.querySelectorAll(
        '[id="' + idToRemove + '"]'
      );
      if (elementsWithId.length > 0) {
        // Keep the first element and remove the rest
        for (var i = 1; i < elementsWithId.length; i++) {
          elementsWithId[i].parentNode.removeChild(elementsWithId[i]);
        }
      }
    }
    fetch(`${BASE_URL}/initialize`, { method: "GET", signal })
      .then(() => {})
      .catch();
  }

  // shows merchant details modal
  function showMerchantModal(config) {
    const data = config;
    // create iframe for merchant details modal
    var merchantIframe = document.createElement("iframe");
    merchantIframe.id = "merchant-iframe";
    merchantIframe.style.position = "fixed";
    merchantIframe.style.top = "0";
    merchantIframe.style.left = "0";
    merchantIframe.style.width = "100%";
    merchantIframe.style.height = "100%";
    merchantIframe.style.border = "none";
    merchantIframe.style.display = "flex";

    var Merchantmodal = document.createElement("div");
    Merchantmodal.setAttribute("id", "merchant-modal");
    Merchantmodal.style.display = "block";
    Merchantmodal.style.position = "fixed";
    Merchantmodal.style.zIndex = "9999";
    Merchantmodal.style.top = "0";
    Merchantmodal.style.left = "0";
    Merchantmodal.style.paddingTop = "100px";
    Merchantmodal.style.width = "100%";
    Merchantmodal.style.height = "100%";
    Merchantmodal.style.overflow = "auto";
    Merchantmodal.style.backgroundColor = "rgb(0, 0, 0, 0.3)";

    var modalContent = document.createElement("div");
    modalContent.setAttribute("id", "merchant-content");
    modalContent.style.backgroundColor = "#fefefe";
    modalContent.style.margin = "auto";
    modalContent.style.width = "100%";
    modalContent.style.borderRadius = "8px";
    modalContent.style.position = "relative";
    modalContent.style.maxWidth = "450px";
    modalContent.style.boxShadow = "0 4px 15px 0 rgba(0,0,0,.2)";

    var closeBtn = document.createElement("div");
    closeBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 7L7 17M7 7L17 17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    // closeBtn.className = "close close-img";
    closeBtn.style.color = "#000";
    closeBtn.style.float = "right";
    closeBtn.style.marginTop = "0px";
    closeBtn.style.position = "absolute";
    closeBtn.style.right = "-2%";
    closeBtn.style.top = "-2%";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.backgroundColor = "#FAFAFD";
    closeBtn.style.padding = "2px 3px";
    closeBtn.style.borderRadius = "100%";

    // closeBtn.addEventListener("mouseover", function () {
    //   closeBtn.style.backgroundColor = "red";
    //   closeBtn.style.border = "1px solid red";
    //   closeBtn.style.borderRadius = "100%";
    // });

    // modal text parent
    var modalTextParent = document.createElement("div");
    // modalTextParent.className = "modal-text-parent";
    modalTextParent.style.background = "#F5F6FB";
    modalTextParent.style.borderTopLeftRadius = "8px";
    modalTextParent.style.borderTopRightRadius = "8px";
    modalTextParent.style.borderBottom = "1px solid #e0e4f4";
    modalTextParent.style.padding = "20px";
    modalContent.appendChild(modalTextParent);

    // modal header
    var modalText = document.createElement("div");
    // modalText.className = "modal-header";
    modalText.style.display = "flex";
    modalText.style.flexDirection = "row";
    modalText.style.alignItems = "center";
    modalText.style.justifyContent = "space-between";

    // pooler image icon
    var poolerIcon = document.createElement("div");
    poolerIcon.innerHTML = `<svg width="122" height="32" viewBox="0 0 122 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24.383 12.1136L22.9586 10.5829C22.6293 10.4051 22.2876 10.2508 21.936 10.121C20.985 9.75941 19.9744 9.57471 18.9553 9.57618H9.65918L11.1286 26.7961H15.7526V25.9878H18.9553C20.0471 25.9878 21.1283 25.7753 22.137 25.3628C23.1457 24.9502 24.0622 24.3454 24.8341 23.5829C25.606 22.8205 26.2182 21.9154 26.6358 20.9193C27.0535 19.9232 27.2682 18.8556 27.2677 17.7776V17.742C27.251 16.0846 26.6098 14.4928 25.4684 13.2772L24.383 12.1136Z" fill="#52A1FF"/>
    <path d="M25.166 15.594C25.1664 16.6723 24.9516 17.7401 24.5338 18.7364C24.116 19.7327 23.5035 20.638 22.7313 21.4004C21.9591 22.1629 21.0422 22.7676 20.0332 23.1801C19.0241 23.5926 17.9426 23.8047 16.8505 23.8043H13.6508V26.7888H7.56641V7.38673H16.8625C18.3194 7.38485 19.7511 7.76275 21.0127 8.4822L22.9649 10.5785L23.3098 10.9515C24.4908 12.2029 25.1551 13.8452 25.172 15.5555L25.166 15.594Z" fill="#1F7AFF"/>
    <path d="M22.6592 13.4573C22.6599 15.633 21.7858 17.72 20.2287 19.2595C18.6717 20.7991 16.5592 21.6652 14.3556 21.6676H11.141V26.7897H5.05957V5.25H14.3556C15.6236 5.25052 16.8746 5.53795 18.0125 6.09023C19.1504 6.64248 20.145 7.44487 20.9199 8.4358C22.0484 9.87702 22.6601 11.6474 22.6592 13.4691V13.4573Z" fill="#2C1DFF"/>
    <path d="M35.9932 26.5767H39.8383V18.9557H42.7293C47.1526 18.9557 50.3038 17.0784 50.3038 12.8476V12.7356C50.3038 8.53281 47.2682 6.5435 42.6426 6.5435H35.9932V26.5767ZM39.8383 16.2659V9.4294H42.6426C45.1 9.4294 46.5455 10.354 46.5455 12.7356V12.8476C46.5455 15.0611 45.1867 16.2659 42.6426 16.2659H39.8383Z" fill="black"/>
    <path d="M59.0847 24.2231C56.425 24.2231 54.8927 22.3459 54.8927 19.3479V19.1238C54.8927 16.0978 56.4828 14.2766 59.0847 14.2766C61.6867 14.2766 63.2478 16.1258 63.2478 19.1518V19.3479C63.2478 22.3459 61.6867 24.2231 59.0847 24.2231ZM59.0558 26.8569C63.508 26.8569 66.8327 23.8869 66.8327 19.3199V19.0958C66.8327 14.6128 63.508 11.6148 59.0847 11.6148C54.6325 11.6148 51.3078 14.6408 51.3078 19.1798V19.404C51.3078 23.8589 54.6036 26.8569 59.0558 26.8569Z" fill="black"/>
    <path d="M76.1803 24.2231C73.5205 24.2231 71.9883 22.3459 71.9883 19.3479V19.1238C71.9883 16.0978 73.5783 14.2766 76.1803 14.2766C78.7822 14.2766 80.3434 16.1258 80.3434 19.1518V19.3479C80.3434 22.3459 78.7822 24.2231 76.1803 24.2231ZM76.1514 26.8569C80.6036 26.8569 83.9283 23.8869 83.9283 19.3199V19.0958C83.9283 14.6128 80.6036 11.6148 76.1803 11.6148C71.7281 11.6148 68.4034 14.6408 68.4034 19.1798V19.404C68.4034 23.8589 71.6992 26.8569 76.1514 26.8569Z" fill="black"/>
    <path d="M86.5975 26.5767H90.0957V5.14258H86.5975V26.5767Z" fill="black"/>
    <path d="M100.431 26.8569C104.305 26.8569 106.878 25.1758 107.369 22.0937H103.987C103.727 23.5227 102.628 24.3352 100.517 24.3352C97.9155 24.3352 96.47 22.7662 96.3544 19.9923H107.427V19.0117C107.427 13.7723 104.045 11.6148 100.286 11.6148C95.9785 11.6148 92.7695 14.6408 92.7695 19.1798V19.404C92.7695 24.027 95.9785 26.8569 100.431 26.8569ZM96.4122 17.7229C96.7591 15.4534 98.1757 14.0805 100.286 14.0805C102.454 14.0805 103.784 15.2012 103.958 17.7229H96.4122Z" fill="black"/>
    <path d="M109.973 26.5767H113.472V18.9557C113.472 15.8456 115.322 14.893 118.386 14.865V11.6989C115.842 11.7269 114.426 12.8196 113.472 14.6688V11.923H109.973V26.5767Z" fill="black"/>
    </svg>
    `;

    poolerIcon.style.width = "32px";
    poolerIcon.style.height = "32px";
    modalText.appendChild(poolerIcon);

    // amount and email address column
    var modalAmountEmail = document.createElement("div");
    // modalAmountEmail.className = "modal-amt-email";
    modalAmountEmail.style.display = "flex";
    modalAmountEmail.style.flexDirection = "column";
    modalAmountEmail.style.marginTop = "0.25rem";
    modalAmountEmail.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    modalAmountEmail.style.fontSize = "1rem";
    modalText.appendChild(modalAmountEmail);
    modalTextParent.appendChild(modalText);

    // amount
    var modalAmount = document.createElement("div");
    // modalAmount.className = "modal-amount modal-amt";
    modalAmount.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    modalAmount.style.fontWeight = "600";
    modalAmount.style.color = "#000";
    modalAmount.style.textAlign = "end";
    modalAmount.style.textAlign = "right";
    modalAmount.style.fontSize = "1.125rem";
    modalAmount.style.paddingBottom = "8px";
    modalAmount.textContent = `${data?.data?.currency_code}${data?.data?.amount}`;
    modalAmountEmail.appendChild(modalAmount);

    // email
    var modalEmail = document.createElement("div");
    // modalEmail.className = "modal-email modal-em";
    modalAmount.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    modalEmail.style.color = "#8f9bb2";
    modalEmail.style.fontStyle = "normal";
    modalEmail.style.fontSize = "1rem";
    modalEmail.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    modalEmail.textContent = `${data?.data?.email}`;
    modalAmountEmail.appendChild(modalEmail);

    // modal body
    var modalBody = document.createElement("div");
    modalBody.style.display = "flex";
    modalBody.style.flexDirection = "column";
    modalBody.style.position = "relative";

    // make transfer to
    var transferToHeader = document.createElement("div");
    // transferToHeader.className = "transferToHeader";
    transferToHeader.style.marginBottom = "0.8rem";
    transferToHeader.style.marginTop = "35px";
    var transferTo = document.createElement("div");
    // transferTo.className = "transfer-to transferTo";
    transferTo.textContent = "Make Transfer to";
    transferTo.style.textAlign = "center";
    transferTo.style.fontFamily = "GraphikRegular, sans-serif";
    transferTo.style.color = "#8f9bb2";
    transferTo.style.fontWeight = "500";
    transferTo.style.fontSize = "14px";
    transferTo.style.paddingBottom = "15px";
    var transferToMerchant = document.createElement("div");
    // transferToMerchant.className = "transferToMerchant";
    // transferToMerchant.textContent = `${data?.data?.display_name}`;
    transferToMerchant.style.textAlign = "center";
    transferToMerchant.style.color = "#000";
    transferToMerchant.style.fontStyle = "normal";
    transferToMerchant.style.fontSize = "16px";
    transferToMerchant.style.fontFamily = "GraphikRegular, sans-serif";
    transferToHeader.appendChild(transferTo);
    transferToHeader.appendChild(transferToMerchant);
    modalBody.appendChild(transferToHeader);

    // merchant details
    var paymentDetails = document.createElement("div");
    // paymentDetails.className = "payment-details";
    paymentDetails.style.listStyleType = "none";
    paymentDetails.style.display = "flex";
    paymentDetails.style.flexDirection = "column";
    paymentDetails.style.width = "79%";
    paymentDetails.style.position = "relative";
    paymentDetails.style.margin = "0 auto 30px auto";
    // paymentDetails.classList.add("payment-details");

    // LIST 1
    var li1 = document.createElement("div");
    // li1.className = "payment-detail";
    li1.style.display = "flex";
    li1.style.flexDirection = "column";
    li1.style.alignItems = "left";
    li1.style.justifyContent = "space-between";
    li1.style.borderBottom = "1px solid #e5e7eb";
    li1.style.paddingTop = "0.9em";
    li1.style.paddingBottom = "0.9em";
    var merchant = document.createElement("div");
    // merchant.className = "payment-detail-text modal-email";
    merchant.textContent = "Merchant";
    merchant.style.fontFamily = "GraphikRegular, sans-serif";
    merchant.style.color = "#8f9bb2";
    merchant.style.display = "block";
    var merchatName = document.createElement("span");
    // merchatName.className = "payment-detail-bold text-truncate";
    merchatName.style.fontFamily = "GraphikMedium, sans-serif";
    merchatName.style.fontWeight = "500";
    merchatName.style.color = "#000";
    merchatName.textContent = `${data?.data?.display_name}`;
    merchatName.style.whiteSpace = "nowrap";
    merchatName.style.overflow = "hidden";
    merchatName.style.textAlign = "left";
    merchatName.style.marginTop = "5px";
    merchatName.style.textOverflow = "ellipsis";
    li1.appendChild(merchant);
    li1.appendChild(merchatName);

    // LIST 2
    var li2 = document.createElement("div");
    // li2.className = "payment-detail";
    li2.style.display = "flex";
    li2.style.flexDirection = "column";
    li2.style.alignItems = "left";
    li2.style.justifyContent = "space-between";
    li2.style.borderBottom = "1px solid #e5e7eb";
    li2.style.paddingTop = "0.9em";
    li2.style.paddingBottom = "0.9em";
    var accNum = document.createElement("span");
    // accNum.className = "payment-detail-text modal-email";
    accNum.textContent = "Account Number";
    accNum.style.fontFamily = "GraphikRegular, sans-serif";
    accNum.style.color = "#8f9bb2";
    var accDetails = document.createElement("span");
    accDetails.textContent = data?.data?.account_no;
    accDetails.style.fontFamily = "GraphikMedium, sans-serif";
    accDetails.style.fontWeight = "500";
    accDetails.style.color = "#000";
    accDetails.style.fontSize = "16px";
    accDetails.style.marginTop = "5px";
    accDetails.style.display = "flex";
    accDetails.style.flexDirection = "row";
    var copy = document.createElement("div");
    copy.innerHTML = `<svg width="24" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 14C3.06812 14 2.60218 14 2.23463 13.8478C1.74458 13.6448 1.35523 13.2554 1.15224 12.7654C1 12.3978 1 11.9319 1 11V4.2C1 3.0799 1 2.51984 1.21799 2.09202C1.40973 1.71569 1.71569 1.40973 2.09202 1.21799C2.51984 1 3.0799 1 4.2 1H11C11.9319 1 12.3978 1 12.7654 1.15224C13.2554 1.35523 13.6448 1.74458 13.8478 2.23463C14 2.60218 14 3.06812 14 4M11.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V11.2C21 10.0799 21 9.51984 20.782 9.09202C20.5903 8.7157 20.2843 8.40973 19.908 8.21799C19.4802 8 18.9201 8 17.8 8H11.2C10.0799 8 9.51984 8 9.09202 8.21799C8.7157 8.40973 8.40973 8.7157 8.21799 9.09202C8 9.51984 8 10.0799 8 11.2V17.8C8 18.9201 8 19.4802 8.21799 19.908C8.40973 20.2843 8.7157 20.5903 9.09202 20.782C9.51984 21 10.0799 21 11.2 21Z" stroke="#CBD1EC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `;
    copy.style.width = "20px";
    copy.style.height = "20px";
    copy.style.position = "absolute";
    copy.style.left = "95%";
    copy.style.cursor = "pointer";
    copy.style.top = "51%";
    copy.src = "./Icon.svg";
    copy.addEventListener("click", () => {
      navigator.clipboard.writeText(`${data?.data?.account_no}`);
      copy.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-checks" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00977d" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M7 12l5 5l10 -10" />
      <path d="M2 12l5 5m5 -5l5 -5" />
    </svg>`;
    });

    setTimeout(() => {
      copy.innerHTML = `<svg width="24" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 14C3.06812 14 2.60218 14 2.23463 13.8478C1.74458 13.6448 1.35523 13.2554 1.15224 12.7654C1 12.3978 1 11.9319 1 11V4.2C1 3.0799 1 2.51984 1.21799 2.09202C1.40973 1.71569 1.71569 1.40973 2.09202 1.21799C2.51984 1 3.0799 1 4.2 1H11C11.9319 1 12.3978 1 12.7654 1.15224C13.2554 1.35523 13.6448 1.74458 13.8478 2.23463C14 2.60218 14 3.06812 14 4M11.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V11.2C21 10.0799 21 9.51984 20.782 9.09202C20.5903 8.7157 20.2843 8.40973 19.908 8.21799C19.4802 8 18.9201 8 17.8 8H11.2C10.0799 8 9.51984 8 9.09202 8.21799C8.7157 8.40973 8.40973 8.7157 8.21799 9.09202C8 9.51984 8 10.0799 8 11.2V17.8C8 18.9201 8 19.4802 8.21799 19.908C8.40973 20.2843 8.7157 20.5903 9.09202 20.782C9.51984 21 10.0799 21 11.2 21Z" stroke="#CBD1EC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    }, 3000);
    accDetails.appendChild(copy);
    li2.appendChild(accNum);
    li2.appendChild(accDetails);

    // LIST 3
    var li3 = document.createElement("div");
    // li3.className = "payment-detail";
    li3.style.display = "flex";
    li3.style.flexDirection = "column";
    li3.style.alignItems = "left";
    li3.style.justifyContent = "space-between";
    li3.style.borderBottom = "1px solid #e5e7eb";
    li3.style.paddingTop = "0.9em";
    li3.style.paddingBottom = "0.9em";
    var bank = document.createElement("span");
    // bank.className = "payment-detail-text modal-email";
    bank.textContent = "Bank Name";
    bank.style.fontFamily = "GraphikRegular, sans-serif";
    bank.style.color = "#8f9bb2";
    var bankDetails = document.createElement("span");
    // bankDetails.className = "payment-detail-bold text-truncate";
    bankDetails.textContent = `${data?.data?.bank_name}`;
    bankDetails.style.whiteSpace = "nowrap";
    bankDetails.style.overflow = "hidden";
    bankDetails.style.textOverflow = "ellipsis";
    bankDetails.style.fontFamily = "GraphikMedium, sans-serif";
    bankDetails.style.fontWeight = "500";
    bankDetails.style.marginTop = "5px";
    bankDetails.style.textAlign = "left";
    bankDetails.style.color = "#000";
    li3.appendChild(bank);
    li3.appendChild(bankDetails);

    // UL MAKE UP
    paymentDetails.appendChild(li1);
    paymentDetails.appendChild(li2);
    paymentDetails.appendChild(li3);
    modalBody.appendChild(paymentDetails);

    // button and countdwon timer
    var modalFooter = document.createElement("div");
    // modalFooter.className = "modal-footer";
    modalFooter.style.display = "flex";
    modalFooter.style.flexDirection = "column";
    modalFooter.style.width = "100%";
    modalFooter.style.paddingTop = "0.5rem";
    modalFooter.style.paddingBottom = "1.5rem";
    // modalFooter.style.paddingLeft = "2rem";
    // modalFooter.style.paddingRight = "2rem";
    var paybutton = document.createElement("button");
    // paybutton.className = "modal-btn";
    paybutton.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    paybutton.style.background = "#2C1DFF";
    paybutton.style.borderRadius = "8px";
    paybutton.style.textAlign = "center";
    paybutton.style.color = "#fff";
    paybutton.style.fontWeight = "500";
    paybutton.style.width = "85%";
    paybutton.style.height = "2.75rem";
    paybutton.style.fontSize = "1.125rem";
    paybutton.style.margin = "0 auto";
    paybutton.style.border = "0px";
    paybutton.style.cursor = "pointer";
    paybutton.textContent = "I have sent the money";
    paybutton.style.zIndex = "1";
    paybutton.style.marginBottom = "60px";
    paybutton.setAttribute("type", "button");
    paybutton.setAttribute("id", "pay-button");
    modalFooter.appendChild(paybutton);
    // count down timer
    var timerText = document.createElement("span");
    timerText.className = "title modal-email timer-text";
    timerText.style.paddingTop = "20px";
    timerText.style.textAlign = "center";
    timerText.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    timerText.textContent = `Expires in 30:00`;

    // // countdown time
    var duration = 1799;
    var countdown = "";
    var timer = setInterval(function () {
      var minutes = Math.floor(duration / 60);
      var seconds = duration % 60;
      countdown = minutes + ":" + seconds;
      if (duration <= 0) {
        showSessionExpirationModal(data);
        clearInterval(timer);
        Merchantmodal.style.display = "none";
        overlay.style.display = "none";
        // document.body.removeChild(Merchantmodal);
        Merchantmodal.parentNode.removeChild(Merchantmodal);
        clearInterval(timer);
        var childNodes = document.body.childNodes;
        var desiredChild = null;
        for (var i = 0; i < childNodes.length; i++) {
          if (childNodes[i].id === "merchant-modal") {
            desiredChild = childNodes[i];
            break;
          }
        }
        if (desiredChild) {
          var parent = desiredChild.parentNode;
          parent.removeChild(desiredChild);
          console.log("yeah");
        }
      }
      duration--;
      timerText.textContent = `Expires in ${
        countdown !== undefined ? countdown : ""
      }`;
    }, 1000);

    // call timer function
    // timer();

    modalFooter.appendChild(timerText);

    // secure by pooler
    var secureTextContainer = document.createElement("div");
    secureTextContainer.style.position = "absolute";
    secureTextContainer.style.display = "row";
    secureTextContainer.style.top = "103%";
    secureTextContainer.style.left = "27%";
    secureTextContainer.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    var htmlContent = document.createElement("div");
    htmlContent.style.display = "flex";
    htmlContent.style.flexDirection = "row";
    htmlContent.style.paddingTop = "8px";
    htmlContent.style.color = "white";
    htmlContent.style.alignItems = "center";

    var htmlContent = `<div style="color: #fff; display: flex; align-items: center; gap: "20px"; flex: row; align-items: center;"><p>Secured by</p><span><svg width="94" height="24" viewBox="0 0 94 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.787 9.08492L17.6895 7.9369C17.4357 7.8036 17.1724 7.68782 16.9016 7.59047C16.1688 7.31931 15.3902 7.18079 14.6049 7.18189H7.44238L8.57455 20.0968H12.1373V19.4906H14.6049C15.4462 19.4906 16.2792 19.3312 17.0565 19.0219C17.8337 18.7124 18.5398 18.2588 19.1346 17.6869C19.7293 17.1151 20.201 16.4363 20.5228 15.6892C20.8446 14.9421 21.01 14.1415 21.0096 13.3329V13.3063C20.9968 12.0632 20.5027 10.8693 19.6233 9.95762L18.787 9.08492Z" fill="#52A1FF"/>
    <path d="M19.3899 11.696C19.3902 12.5047 19.2247 13.3056 18.9028 14.0528C18.581 14.8 18.109 15.479 17.514 16.0508C16.919 16.6227 16.2126 17.0762 15.4351 17.3856C14.6576 17.6949 13.8244 17.854 12.9829 17.8537H10.5176V20.0921H5.82959V5.54053H12.9921C14.1147 5.53913 15.2178 5.82255 16.1899 6.36214L17.694 7.93433L17.9597 8.21411C18.8697 9.15265 19.3815 10.3844 19.3945 11.6671L19.3899 11.696Z" fill="#1F7AFF"/>
    <path d="M17.4583 10.093C17.4589 11.7247 16.7853 13.29 15.5857 14.4446C14.386 15.5993 12.7583 16.2489 11.0605 16.2507H8.58365V20.0923H3.89795V3.9375H11.0605C12.0375 3.93789 13.0013 4.15346 13.8781 4.56767C14.7548 4.98186 15.5211 5.58366 16.1182 6.32685C16.9877 7.40777 17.459 8.73559 17.4583 10.1019V10.093Z" fill="#2C1DFF"/>
    <path d="M27.7319 19.9327H30.6945V14.2169H32.9221C36.3302 14.2169 38.7582 12.809 38.7582 9.63592V9.55186C38.7582 6.39979 36.4193 4.90781 32.8552 4.90781H27.7319V19.9327ZM30.6945 12.1996V7.07223H32.8552C34.7486 7.07223 35.8624 7.76569 35.8624 9.55186V9.63592C35.8624 11.296 34.8155 12.1996 32.8552 12.1996H30.6945Z" fill="white"/>
    <path d="M45.5238 18.1675C43.4745 18.1675 42.2939 16.7596 42.2939 14.5111V14.343C42.2939 12.0735 43.519 10.7076 45.5238 10.7076C47.5286 10.7076 48.7314 12.0945 48.7314 14.364V14.5111C48.7314 16.7596 47.5286 18.1675 45.5238 18.1675ZM45.5015 20.1428C48.9319 20.1428 51.4936 17.9154 51.4936 14.4901V14.322C51.4936 10.9598 48.9319 8.71131 45.5238 8.71131C42.0934 8.71131 39.5317 10.9808 39.5317 14.385V14.5532C39.5317 17.8944 42.0711 20.1428 45.5015 20.1428Z" fill="white"/>
    <path d="M58.6958 18.1675C56.6465 18.1675 55.4659 16.7596 55.4659 14.5111V14.343C55.4659 12.0735 56.691 10.7076 58.6958 10.7076C60.7006 10.7076 61.9034 12.0945 61.9034 14.364V14.5111C61.9034 16.7596 60.7006 18.1675 58.6958 18.1675ZM58.6735 20.1428C62.1039 20.1428 64.6656 17.9154 64.6656 14.4901V14.322C64.6656 10.9598 62.1039 8.71131 58.6958 8.71131C55.2654 8.71131 52.7037 10.9808 52.7037 14.385V14.5532C52.7037 17.8944 55.2431 20.1428 58.6735 20.1428Z" fill="white"/>
    <path d="M66.7222 19.9327H69.4175V3.85712H66.7222V19.9327Z" fill="white"/>
    <path d="M77.3806 20.1428C80.3655 20.1428 82.348 18.882 82.7266 16.5705H80.1204C79.9199 17.6422 79.0735 18.2516 77.4474 18.2516C75.4426 18.2516 74.3289 17.0748 74.2398 14.9944H82.7712V14.259C82.7712 10.3294 80.165 8.71131 77.2692 8.71131C73.9502 8.71131 71.4776 10.9808 71.4776 14.385V14.5532C71.4776 18.0204 73.9502 20.1428 77.3806 20.1428ZM74.2843 13.2923C74.5516 11.5902 75.6431 10.5605 77.2692 10.5605C78.9398 10.5605 79.9645 11.4011 80.0982 13.2923H74.2843Z" fill="white"/>
    <path d="M84.7332 19.9327H87.4285V14.2169C87.4285 11.8844 88.8541 11.1699 91.2153 11.1489V8.77435C89.255 8.79537 88.1635 9.6149 87.4285 11.0018V8.94246H84.7332V19.9327Z" fill="white"/>
    </svg>
    </span></div>`;

    secureTextContainer.innerHTML = htmlContent;
    modalContent.appendChild(secureTextContainer);
    // modalFooter.appendChild(secureTextContainer);

    // MODAL BUILD UP
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    Merchantmodal.appendChild(modalContent);
    // overlay.appendChild(modal);
    const handleMerchantLoad = () => {
      var iframeWindow = merchantIframe.contentWindow;
      iframeWindow.document.body.appendChild(Merchantmodal);
    };

    merchantIframe.addEventListener("load", handleMerchantLoad);
    document.body.appendChild(merchantIframe); // Append modal to the document body

    // CHECK TO SEE MULTIPLE MERCHANT IFRAMES EXIST, KEEP 1 AND REMOVE THE REST
    var idToRemove = "merchant-iframe";
    var elementsWithId = document.querySelectorAll('[id="' + idToRemove + '"]');

    if (elementsWithId.length > 1) {
      // Keep the first element and remove the rest
      for (var i = 1; i < elementsWithId.length; i++) {
        elementsWithId[i].parentNode.removeChild(elementsWithId[i]);
      }
    }

    // CHECK FOR SESSION RE-RENDERS, AND REMOVE
    var sessionRemove = "session-iframe";
    var sessionWithId = document.querySelectorAll(
      '[id="' + sessionRemove + '"]'
    );
    if (sessionWithId.length > 0) {
      // Keep the first element and remove the rest
      for (var i = 0; i < sessionWithId.length; i++) {
        sessionWithId[i].parentNode.removeChild(sessionWithId[i]);
      }
    }

    function handleEffect() {
      var idToRemove = "merchant-iframe";
      var elementsWithId = document.querySelectorAll(
        '[id="' + idToRemove + '"]'
      );

      if (elementsWithId.length > 0) {
        // Keep the first element and remove the rest
        for (var i = 0; i < elementsWithId.length; i++) {
          elementsWithId[i].parentNode.removeChild(elementsWithId[i]);
        }
      }
    }

    // CLOSE BUTTON EXECUTION
    closeBtn.addEventListener("click", function () {
      merchantIframe.parentNode.removeChild(merchantIframe);
      merchantIframe.style.display = "none";
      Merchantmodal.style.display = "none";
      var childNodes = document.body.childNodes;
      var desiredChild = null;
      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i].id === "merchant-iframe") {
          desiredChild = childNodes[i];
          break;
        }
      }
      if (desiredChild) {
        var parent = desiredChild.parentNode;
        parent.removeChild(desiredChild);
        // remove listener
        merchantIframe.removeEventListener("load", () => {});
      }
    });

    // PAY BUTTON EXECUTION
    paybutton.addEventListener("click", function () {
      merchantIframe.removeEventListener("load", handleMerchantLoad);
      showAwaitingModal(data);
      handleEffect();
      // merchantIframe.parentNode.removeChild(merchantIframe);
      merchantIframe.style.display = "none";
      Merchantmodal.style.display = "none";
      var childNodes = document.body.childNodes;
      var desiredChild = null;
      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i].id === "merchant-iframe") {
          desiredChild = childNodes[i];
          break;
        }
      }
      if (desiredChild) {
        var parent = desiredChild.parentNode;
        parent.removeChild(desiredChild);
      }
    });
  }

  // show awaiting payment while socket is opened
  function showAwaitingModal(data) {
    // spin up an iframe for awaiting modal
    const modalProps = data;
    var awaitingIframe = document.createElement("iframe");
    awaitingIframe.id = "awaiting-iframe";
    awaitingIframe.style.position = "fixed";
    awaitingIframe.style.top = "0";
    awaitingIframe.style.left = "0";
    awaitingIframe.style.width = "100%";
    awaitingIframe.style.height = "100%";
    awaitingIframe.style.border = "none";
    awaitingIframe.style.display = "flex";

    var Awaitingmodal = document.createElement("div");
    Awaitingmodal.setAttribute("id", "awaiting-modal");
    Awaitingmodal.style.display = "block";
    Awaitingmodal.style.position = "fixed";
    Awaitingmodal.style.zIndex = "9999";
    Awaitingmodal.style.top = "0";
    Awaitingmodal.style.left = "0";
    Awaitingmodal.style.paddingTop = "100px";
    Awaitingmodal.style.width = "100%";
    Awaitingmodal.style.height = "100%";
    Awaitingmodal.style.overflow = "auto";
    Awaitingmodal.style.backgroundColor = "rgb(0, 0, 0, 0.5)";
    // modal.className = "modal";

    var modalContent = document.createElement("div");
    // modalContent.className = "modal-content";
    modalContent.style.backgroundColor = "#fefefe";
    modalContent.style.margin = "auto";
    modalContent.style.width = "100%";
    modalContent.style.borderRadius = "8px";
    modalContent.style.position = "relative";
    modalContent.style.maxWidth = "450px";
    modalContent.style.boxShadow = "0 4px 15px 0 rgba(0,0,0,.2)";

    var closeBtn = document.createElement("div");
    closeBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17 7L7 17M7 7L17 17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
    // closeBtn.className = "close close-img";
    closeBtn.style.color = "#000";
    closeBtn.style.float = "right";
    closeBtn.style.marginTop = "0px";
    closeBtn.style.position = "absolute";
    closeBtn.style.right = "-2%";
    closeBtn.style.top = "-2%";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.backgroundColor = "#FAFAFD";
    closeBtn.style.padding = "2px 3px";
    closeBtn.style.borderRadius = "100%";

    // modal text parent
    var modalTextParent = document.createElement("div");
    // modalTextParent.className = "modal-text-parent";
    modalTextParent.style.background = "#F5F6FB";
    modalTextParent.style.borderTopLeftRadius = "8px";
    modalTextParent.style.borderTopRightRadius = "8px";
    modalTextParent.style.borderBottom = "1px solid #e0e4f4";
    modalTextParent.style.padding = "20px";
    modalContent.appendChild(modalTextParent);

    // modal header
    var modalText = document.createElement("div");
    modalText.style.display = "flex";
    modalText.style.flexDirection = "row";
    modalText.style.alignItems = "center";
    modalText.style.justifyContent = "space-between";

    // pooler image icon
    var poolerIcon = document.createElement("div");
    poolerIcon.innerHTML = `<svg width="122" height="32" viewBox="0 0 122 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M24.383 12.1136L22.9586 10.5829C22.6293 10.4051 22.2876 10.2508 21.936 10.121C20.985 9.75941 19.9744 9.57471 18.9553 9.57618H9.65918L11.1286 26.7961H15.7526V25.9878H18.9553C20.0471 25.9878 21.1283 25.7753 22.137 25.3628C23.1457 24.9502 24.0622 24.3454 24.8341 23.5829C25.606 22.8205 26.2182 21.9154 26.6358 20.9193C27.0535 19.9232 27.2682 18.8556 27.2677 17.7776V17.742C27.251 16.0846 26.6098 14.4928 25.4684 13.2772L24.383 12.1136Z" fill="#52A1FF"/>
  <path d="M25.166 15.594C25.1664 16.6723 24.9516 17.7401 24.5338 18.7364C24.116 19.7327 23.5035 20.638 22.7313 21.4004C21.9591 22.1629 21.0422 22.7676 20.0332 23.1801C19.0241 23.5926 17.9426 23.8047 16.8505 23.8043H13.6508V26.7888H7.56641V7.38673H16.8625C18.3194 7.38485 19.7511 7.76275 21.0127 8.4822L22.9649 10.5785L23.3098 10.9515C24.4908 12.2029 25.1551 13.8452 25.172 15.5555L25.166 15.594Z" fill="#1F7AFF"/>
  <path d="M22.6592 13.4573C22.6599 15.633 21.7858 17.72 20.2287 19.2595C18.6717 20.7991 16.5592 21.6652 14.3556 21.6676H11.141V26.7897H5.05957V5.25H14.3556C15.6236 5.25052 16.8746 5.53795 18.0125 6.09023C19.1504 6.64248 20.145 7.44487 20.9199 8.4358C22.0484 9.87702 22.6601 11.6474 22.6592 13.4691V13.4573Z" fill="#2C1DFF"/>
  <path d="M35.9932 26.5767H39.8383V18.9557H42.7293C47.1526 18.9557 50.3038 17.0784 50.3038 12.8476V12.7356C50.3038 8.53281 47.2682 6.5435 42.6426 6.5435H35.9932V26.5767ZM39.8383 16.2659V9.4294H42.6426C45.1 9.4294 46.5455 10.354 46.5455 12.7356V12.8476C46.5455 15.0611 45.1867 16.2659 42.6426 16.2659H39.8383Z" fill="black"/>
  <path d="M59.0847 24.2231C56.425 24.2231 54.8927 22.3459 54.8927 19.3479V19.1238C54.8927 16.0978 56.4828 14.2766 59.0847 14.2766C61.6867 14.2766 63.2478 16.1258 63.2478 19.1518V19.3479C63.2478 22.3459 61.6867 24.2231 59.0847 24.2231ZM59.0558 26.8569C63.508 26.8569 66.8327 23.8869 66.8327 19.3199V19.0958C66.8327 14.6128 63.508 11.6148 59.0847 11.6148C54.6325 11.6148 51.3078 14.6408 51.3078 19.1798V19.404C51.3078 23.8589 54.6036 26.8569 59.0558 26.8569Z" fill="black"/>
  <path d="M76.1803 24.2231C73.5205 24.2231 71.9883 22.3459 71.9883 19.3479V19.1238C71.9883 16.0978 73.5783 14.2766 76.1803 14.2766C78.7822 14.2766 80.3434 16.1258 80.3434 19.1518V19.3479C80.3434 22.3459 78.7822 24.2231 76.1803 24.2231ZM76.1514 26.8569C80.6036 26.8569 83.9283 23.8869 83.9283 19.3199V19.0958C83.9283 14.6128 80.6036 11.6148 76.1803 11.6148C71.7281 11.6148 68.4034 14.6408 68.4034 19.1798V19.404C68.4034 23.8589 71.6992 26.8569 76.1514 26.8569Z" fill="black"/>
  <path d="M86.5975 26.5767H90.0957V5.14258H86.5975V26.5767Z" fill="black"/>
  <path d="M100.431 26.8569C104.305 26.8569 106.878 25.1758 107.369 22.0937H103.987C103.727 23.5227 102.628 24.3352 100.517 24.3352C97.9155 24.3352 96.47 22.7662 96.3544 19.9923H107.427V19.0117C107.427 13.7723 104.045 11.6148 100.286 11.6148C95.9785 11.6148 92.7695 14.6408 92.7695 19.1798V19.404C92.7695 24.027 95.9785 26.8569 100.431 26.8569ZM96.4122 17.7229C96.7591 15.4534 98.1757 14.0805 100.286 14.0805C102.454 14.0805 103.784 15.2012 103.958 17.7229H96.4122Z" fill="black"/>
  <path d="M109.973 26.5767H113.472V18.9557C113.472 15.8456 115.322 14.893 118.386 14.865V11.6989C115.842 11.7269 114.426 12.8196 113.472 14.6688V11.923H109.973V26.5767Z" fill="black"/>
  </svg>
  `;
    poolerIcon.style.width = "32px";
    poolerIcon.style.height = "32px";
    modalText.appendChild(poolerIcon);

    // amount and email address column
    var modalAmountEmail = document.createElement("div");
    // modalAmountEmail.className = "modal-amt-email";
    modalAmountEmail.style.display = "flex";
    modalAmountEmail.style.flexDirection = "column";
    modalAmountEmail.style.marginTop = "0.25rem";
    modalAmountEmail.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    modalAmountEmail.style.fontSize = "1rem";
    modalText.appendChild(modalAmountEmail);
    modalTextParent.appendChild(modalText);

    // amount
    var modalAmount = document.createElement("div");
    modalAmount.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    modalAmount.style.fontWeight = "600";
    modalAmount.style.color = "#000";
    modalAmount.style.textAlign = "end";
    modalAmount.style.textAlign = "right";
    modalAmount.style.fontSize = "1.125rem";
    modalAmount.style.paddingBottom = "8px";
    modalAmount.textContent = `${data?.data?.currency_code}${data?.data?.amount}`;
    modalAmountEmail.appendChild(modalAmount);

    // email
    var modalEmail = document.createElement("div");
    modalEmail.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    modalEmail.style.color = "#8f9bb2";
    modalEmail.style.fontStyle = "normal";
    modalEmail.style.fontSize = "1rem";
    modalEmail.textContent = `${data?.data?.email}`;
    modalAmountEmail.appendChild(modalEmail);

    // modal body
    var modalBody = document.createElement("div");
    // modalBody.className = "modal-body";
    modalBody.style.display = "flex";
    modalBody.style.flexDirection = "column";
    modalBody.style.position = "relative";
    modalBody.style.justifyContent = "center";

    // merchant details
    var paymentDetails = document.createElement("div");
    // paymentDetails.className = "payment-details";
    paymentDetails.style.listStyleType = "none";
    paymentDetails.style.display = "flex";
    paymentDetails.style.flexDirection = "column";
    paymentDetails.style.width = "79%";
    paymentDetails.style.paddingBottom = "15px";
    paymentDetails.style.position = "relative";
    paymentDetails.style.margin = "30px auto";

    // AWAITING REQUEST LOADER
    var awaitingContainer = document.createElement("div");
    awaitingContainer.style.background = "#F5F6FB";
    awaitingContainer.style.display = "flex";
    awaitingContainer.style.flexDirection = "column";
    awaitingContainer.style.borderRadius = "0.5rem";
    awaitingContainer.style.margin = "auto";
    awaitingContainer.style.width = "85%";
    awaitingContainer.style.paddingTop = "1.5rem";
    awaitingContainer.style.paddingBottom = "1.5rem";
    awaitingContainer.style.justifyContent = "center";
    awaitingContainer.style.marginTop = "25px";
    modalBody.appendChild(awaitingContainer);
    // loader
    var loader = document.createElement("div");
    loader.className = "spinner-5 spinner-centered";

    var style = document.createElement("style");
    style.innerHTML = `  
    .spinner-centered {
      text-align: center;
      margin-left: auto;
      margin-right: auto;
    }
  
  .spinner-5 {
    width: 50px;
    aspect-ratio: 1;
    display: grid;
    border:4px solid #0000;
    border-radius: 50%;
    border-right-color: #2C1DFF;
    animation: s5 0.8s infinite linear;
  }
  .spinner-5::before,
  .spinner-5::after {    
    content: "";
    grid-area: 1/1;
    margin: 2px;
    border: inherit;
    border-radius: 50%;
    animation: s5 1.6s infinite;
  }
  .spinner-5::after {
    margin: 8px;
    animation-duration: 3s;
  }
  
  @keyframes s5{ 
    100%{transform: rotate(1turn)}
  }
  `;
    document.head.appendChild(style);
    awaitingContainer.appendChild(loader);

    //   awaiting confirmation
    var awaitingConfirmation = document.createElement("div");
    awaitingConfirmation.textContent = "Awaiting confirmation";
    awaitingConfirmation.style.paddingTop = "10px";
    awaitingConfirmation.style.fontFamily = "GraphikRegular, sans-serif";
    awaitingConfirmation.style.textAlign = "center";
    awaitingConfirmation.style.fontSize = "16px";
    awaitingConfirmation.style.paddingTop = "20px";
    awaitingContainer.appendChild(awaitingConfirmation);

    //   awaiting confirmation message
    var awaitingMessage = document.createElement("div");
    // awaitingMessage.className = "awaiting-message modal-email";
    awaitingMessage.style.fontFamily = "GraphikRegular, sans-serif";
    awaitingMessage.style.margin = "auto";
    awaitingMessage.style.width = "80%";
    awaitingMessage.style.fontSize = "14px";
    awaitingMessage.style.textAlign = "center";
    awaitingMessage.style.paddingTop = "20px";
    awaitingMessage.style.color = "#8f9bb2";
    awaitingMessage.textContent =
      "We are confirming your transaction. This will take a few minutes.";
    awaitingContainer.appendChild(awaitingMessage);

    // LIST 1
    var li1 = document.createElement("div");
    li1.className = "payment-detail";
    li1.style.display = "flex";
    li1.style.flexDirection = "column";
    li1.style.alignItems = "left";
    li1.style.justifyContent = "space-between";
    li1.style.borderBottom = "1px solid #e5e7eb";
    li1.style.paddingTop = "0.9em";
    li1.style.paddingBottom = "0.9em";
    var merchant = document.createElement("span");
    merchant.className = "payment-detail-text modal-email";
    merchant.textContent = "Merchant";
    merchant.style.fontFamily = "GraphikRegular, sans-serif";
    merchant.style.color = "#8f9bb2";
    var merchatName = document.createElement("span");
    merchatName.className = "payment-detail-bold text-truncate";
    merchatName.style.fontFamily = "GraphikMedium, sans-serif";
    merchatName.style.fontWeight = "500";
    merchatName.style.color = "#000";
    merchatName.style.marginTop = "5px";
    merchatName.textContent = `${data?.data?.display_name}`;
    li1.appendChild(merchant);
    li1.appendChild(merchatName);

    // LIST 2
    var li2 = document.createElement("div");
    // li2.className = "payment-detail";
    li2.style.display = "flex";
    li2.style.flexDirection = "column";
    li2.style.alignItems = "left";
    li2.style.justifyContent = "space-between";
    li2.style.borderBottom = "1px solid #e5e7eb";
    li2.style.paddingTop = "0.9em";
    li2.style.paddingBottom = "0.9em";
    var accNum = document.createElement("span");
    accNum.className = "payment-detail-text modal-email";
    accNum.textContent = "Account Number";
    accNum.style.fontFamily = "GraphikRegular, sans-serif";
    accNum.style.color = "#8f9bb2";
    accNum.style.marginTop = "5px";
    var accDetails = document.createElement("span");
    accDetails.className = "payment-detail-bold row-span";
    accDetails.textContent = `${data?.data?.account_no}`;

    accDetails.className = "payment-detail-bold text-truncate";
    accDetails.style.fontFamily = "GraphikMedium, sans-serif";
    accDetails.style.fontWeight = "500";
    accNum.style.color = "#8f9bb2";
    accDetails.style.color = "#000";
    accDetails.style.display = "flex";
    accDetails.style.flexDirection = "row";
    var copy = document.createElement("div");
    copy.className = "copy";
    copy.innerHTML = `<svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 14C3.06812 14 2.60218 14 2.23463 13.8478C1.74458 13.6448 1.35523 13.2554 1.15224 12.7654C1 12.3978 1 11.9319 1 11V4.2C1 3.0799 1 2.51984 1.21799 2.09202C1.40973 1.71569 1.71569 1.40973 2.09202 1.21799C2.51984 1 3.0799 1 4.2 1H11C11.9319 1 12.3978 1 12.7654 1.15224C13.2554 1.35523 13.6448 1.74458 13.8478 2.23463C14 2.60218 14 3.06812 14 4M11.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V11.2C21 10.0799 21 9.51984 20.782 9.09202C20.5903 8.7157 20.2843 8.40973 19.908 8.21799C19.4802 8 18.9201 8 17.8 8H11.2C10.0799 8 9.51984 8 9.09202 8.21799C8.7157 8.40973 8.40973 8.7157 8.21799 9.09202C8 9.51984 8 10.0799 8 11.2V17.8C8 18.9201 8 19.4802 8.21799 19.908C8.40973 20.2843 8.7157 20.5903 9.09202 20.782C9.51984 21 10.0799 21 11.2 21Z" stroke="#CBD1EC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
    copy.style.width = "20px";
    copy.style.height = "20px";
    copy.style.position = "absolute";
    copy.style.left = "95%";
    copy.style.cursor = "pointer";
    copy.style.top = "42%";
    copy.src = "./Icon.svg";
    copy.addEventListener("click", () => {
      navigator.clipboard.writeText(`${data?.data?.account_no}`);
      copy.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-checks" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00977d" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M7 12l5 5l10 -10" />
      <path d="M2 12l5 5m5 -5l5 -5" />
    </svg>`;
    });

    // setTimeout(() => {
    //   copy.innerHTML = `<svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    // <path d="M4 14C3.06812 14 2.60218 14 2.23463 13.8478C1.74458 13.6448 1.35523 13.2554 1.15224 12.7654C1 12.3978 1 11.9319 1 11V4.2C1 3.0799 1 2.51984 1.21799 2.09202C1.40973 1.71569 1.71569 1.40973 2.09202 1.21799C2.51984 1 3.0799 1 4.2 1H11C11.9319 1 12.3978 1 12.7654 1.15224C13.2554 1.35523 13.6448 1.74458 13.8478 2.23463C14 2.60218 14 3.06812 14 4M11.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V11.2C21 10.0799 21 9.51984 20.782 9.09202C20.5903 8.7157 20.2843 8.40973 19.908 8.21799C19.4802 8 18.9201 8 17.8 8H11.2C10.0799 8 9.51984 8 9.09202 8.21799C8.7157 8.40973 8.40973 8.7157 8.21799 9.09202C8 9.51984 8 10.0799 8 11.2V17.8C8 18.9201 8 19.4802 8.21799 19.908C8.40973 20.2843 8.7157 20.5903 9.09202 20.782C9.51984 21 10.0799 21 11.2 21Z" stroke="#CBD1EC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    // </svg>
    // `;
    // }, 3000);

    accDetails.appendChild(copy);
    li2.appendChild(accNum);
    li2.appendChild(accDetails);

    // LIST 3
    var li3 = document.createElement("div");
    li3.className = "payment-detail";
    li3.style.display = "flex";
    li3.style.flexDirection = "column";
    li3.style.alignItems = "left";
    li3.style.justifyContent = "space-between";
    li3.style.borderBottom = "1px solid #e5e7eb";
    li3.style.paddingTop = "0.9em";
    li3.style.paddingBottom = "0.9em";
    var bank = document.createElement("span");
    bank.className = "payment-detail-text modal-email";
    bank.textContent = "Bank name";
    bank.style.fontFamily = "GraphikRegular, sans-serif";
    bank.style.color = "#8f9bb2";
    var bankDetails = document.createElement("span");
    bankDetails.className = "payment-detail-bold text-truncate";
    bankDetails.textContent = `${data?.data?.bank_name}`;
    bankDetails.textAlign = "right";
    bankDetails.style.width = "125px";
    bankDetails.style.whiteSpace = "nowrap";
    bankDetails.style.overflow = "hidden";
    bankDetails.style.textOverflow = "ellipsis";
    bankDetails.style.fontFamily = "GraphikMedium, sans-serif";
    bankDetails.style.fontWeight = "500";
    bankDetails.style.color = "#000";
    bankDetails.style.marginTop = "5px";
    li3.appendChild(bank);
    li3.appendChild(bankDetails);

    // UL MAKE UP
    paymentDetails.appendChild(li1);
    paymentDetails.appendChild(li2);
    paymentDetails.appendChild(li3);
    modalBody.appendChild(paymentDetails);

    // button and countdwon timer
    var modalFooter = document.createElement("div");
    // modalFooter.className = "modal-footer";
    modalFooter.style.display = "flex";
    modalFooter.style.flexDirection = "column";
    modalFooter.style.width = "100%";
    modalFooter.style.paddingTop = "0.5rem";
    modalFooter.style.paddingBottom = "1.5rem";
    // modalFooter.style.paddingLeft = "2rem";
    // modalFooter.style.paddingRight = "2rem";

    // call timer function
    var timerText = document.createElement("span");
    timerText.className = "title modal-email timer-text";
    timerText.style.paddingTop = "20px";
    timerText.style.textAlign = "center";
    timerText.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    timerText.textContent = `Expires in 30:00`;

    // countdown time
    var duration = 1799;
    var countdown = "";
    var timer = setInterval(function () {
      var minutes = Math.floor(duration / 60);
      var seconds = duration % 60;
      countdown = minutes + ":" + seconds;
      if (duration <= 0) {
        clearInterval(timer);
        showSessionExpirationModal(data);
      }
      duration--;
      timerText.textContent = `Expires in ${
        countdown !== undefined ? countdown : ""
      }`;
    }, 1000);

    modalFooter.appendChild(timerText);

    // secure by pooler
    var secureTextContainer = document.createElement("div");
    // secureTextContainer.className = "absolute footer-text";
    secureTextContainer.style.position = "absolute";
    secureTextContainer.style.top = "103%";
    secureTextContainer.style.left = "27%";
    secureTextContainer.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    var htmlContent = document.createElement("div");
    htmlContent.style.display = "flex";
    htmlContent.style.flexDirection = "row";
    htmlContent.style.paddingTop = "8px";
    htmlContent.style.color = "white";
    htmlContent.style.alignItems = "center";
    var htmlContent = `<div style="color: #fff; display: flex; align-items: center; gap: "20px"; flex: row; align-items: center;"><p>Secured by</p><span><svg width="94" height="24" viewBox="0 0 94 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.787 9.08492L17.6895 7.9369C17.4357 7.8036 17.1724 7.68782 16.9016 7.59047C16.1688 7.31931 15.3902 7.18079 14.6049 7.18189H7.44238L8.57455 20.0968H12.1373V19.4906H14.6049C15.4462 19.4906 16.2792 19.3312 17.0565 19.0219C17.8337 18.7124 18.5398 18.2588 19.1346 17.6869C19.7293 17.1151 20.201 16.4363 20.5228 15.6892C20.8446 14.9421 21.01 14.1415 21.0096 13.3329V13.3063C20.9968 12.0632 20.5027 10.8693 19.6233 9.95762L18.787 9.08492Z" fill="#52A1FF"/>
    <path d="M19.3899 11.696C19.3902 12.5047 19.2247 13.3056 18.9028 14.0528C18.581 14.8 18.109 15.479 17.514 16.0508C16.919 16.6227 16.2126 17.0762 15.4351 17.3856C14.6576 17.6949 13.8244 17.854 12.9829 17.8537H10.5176V20.0921H5.82959V5.54053H12.9921C14.1147 5.53913 15.2178 5.82255 16.1899 6.36214L17.694 7.93433L17.9597 8.21411C18.8697 9.15265 19.3815 10.3844 19.3945 11.6671L19.3899 11.696Z" fill="#1F7AFF"/>
    <path d="M17.4583 10.093C17.4589 11.7247 16.7853 13.29 15.5857 14.4446C14.386 15.5993 12.7583 16.2489 11.0605 16.2507H8.58365V20.0923H3.89795V3.9375H11.0605C12.0375 3.93789 13.0013 4.15346 13.8781 4.56767C14.7548 4.98186 15.5211 5.58366 16.1182 6.32685C16.9877 7.40777 17.459 8.73559 17.4583 10.1019V10.093Z" fill="#2C1DFF"/>
    <path d="M27.7319 19.9327H30.6945V14.2169H32.9221C36.3302 14.2169 38.7582 12.809 38.7582 9.63592V9.55186C38.7582 6.39979 36.4193 4.90781 32.8552 4.90781H27.7319V19.9327ZM30.6945 12.1996V7.07223H32.8552C34.7486 7.07223 35.8624 7.76569 35.8624 9.55186V9.63592C35.8624 11.296 34.8155 12.1996 32.8552 12.1996H30.6945Z" fill="white"/>
    <path d="M45.5238 18.1675C43.4745 18.1675 42.2939 16.7596 42.2939 14.5111V14.343C42.2939 12.0735 43.519 10.7076 45.5238 10.7076C47.5286 10.7076 48.7314 12.0945 48.7314 14.364V14.5111C48.7314 16.7596 47.5286 18.1675 45.5238 18.1675ZM45.5015 20.1428C48.9319 20.1428 51.4936 17.9154 51.4936 14.4901V14.322C51.4936 10.9598 48.9319 8.71131 45.5238 8.71131C42.0934 8.71131 39.5317 10.9808 39.5317 14.385V14.5532C39.5317 17.8944 42.0711 20.1428 45.5015 20.1428Z" fill="white"/>
    <path d="M58.6958 18.1675C56.6465 18.1675 55.4659 16.7596 55.4659 14.5111V14.343C55.4659 12.0735 56.691 10.7076 58.6958 10.7076C60.7006 10.7076 61.9034 12.0945 61.9034 14.364V14.5111C61.9034 16.7596 60.7006 18.1675 58.6958 18.1675ZM58.6735 20.1428C62.1039 20.1428 64.6656 17.9154 64.6656 14.4901V14.322C64.6656 10.9598 62.1039 8.71131 58.6958 8.71131C55.2654 8.71131 52.7037 10.9808 52.7037 14.385V14.5532C52.7037 17.8944 55.2431 20.1428 58.6735 20.1428Z" fill="white"/>
    <path d="M66.7222 19.9327H69.4175V3.85712H66.7222V19.9327Z" fill="white"/>
    <path d="M77.3806 20.1428C80.3655 20.1428 82.348 18.882 82.7266 16.5705H80.1204C79.9199 17.6422 79.0735 18.2516 77.4474 18.2516C75.4426 18.2516 74.3289 17.0748 74.2398 14.9944H82.7712V14.259C82.7712 10.3294 80.165 8.71131 77.2692 8.71131C73.9502 8.71131 71.4776 10.9808 71.4776 14.385V14.5532C71.4776 18.0204 73.9502 20.1428 77.3806 20.1428ZM74.2843 13.2923C74.5516 11.5902 75.6431 10.5605 77.2692 10.5605C78.9398 10.5605 79.9645 11.4011 80.0982 13.2923H74.2843Z" fill="white"/>
    <path d="M84.7332 19.9327H87.4285V14.2169C87.4285 11.8844 88.8541 11.1699 91.2153 11.1489V8.77435C89.255 8.79537 88.1635 9.6149 87.4285 11.0018V8.94246H84.7332V19.9327Z" fill="white"/>
    </svg>
    </span></div>`;

    secureTextContainer.innerHTML = htmlContent;
    modalContent.appendChild(secureTextContainer);

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    Awaitingmodal.appendChild(modalContent);

    function handleIframeLoad() {
      handleMerchantEffect();
      var iframeWindow = awaitingIframe.contentWindow;
      iframeWindow.document.head.appendChild(style);
      iframeWindow.document.body.appendChild(Awaitingmodal);

      // LOAD PUSHER SCRIPT DYNAMICALLY AND ADD TO  DOM
      const script = document.createElement("script");
      script.src = "https://js.pusher.com/8.2.0/pusher.min.js";
      script.async = true;
      script.onload = function () {
        var PUSHER_SIGN_APP_KEY = "f5715eb30d0b1b069d22";
        var PUSHER_SIGN_CHANNEL_KEY = "signature_dev";

        var PUSHER_TSQ_APP_KEY = "79e7b34f11d419e304e5";
        var PUSHER_TSQ_CHANNEL_KEY = "tsq_dev";

        const pusherSign = new Pusher(PUSHER_SIGN_APP_KEY, {
          cluster: "mt1",
        });
        const pusherSignSubscribe = pusherSign.subscribe(
          PUSHER_SIGN_CHANNEL_KEY
        );

        const removeSubscription = () => {
          pusherSignSubscribe.unsubscribe(PUSHER_SIGN_CHANNEL_KEY);
          pusherSignSubscribe.unbind();
        };

        const fetchData = () => {
          fetch(`${BASE_URL}/initialize`, { method: "GET" }).then().catch();
        };
        // get signature from pusher signature channel
        function getSignature(callback) {
          pusherSignSubscribe.bind("data", function (data) {
            // Call the callback function with the updated data
            if (data?.data?.signature) {
              return callback(data?.data?.signature);
            }
          });
        }
        const fetchDatInterval = setInterval(() => {
          fetchData();
        }, 5000);

        getSignature((signatureValue) => {
          const callTsq = (signature) => {
            var tsqObject = {
              action: "tsq",
              signature: signature,
              account_no: data?.data?.account_no,
              pub_key: data?.merchantConfig?.pub_key,
            };

            fetch(`${BASE_URL}/socket`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(tsqObject),
            });
          };
          const signatureInterval = setInterval(() => {
            callTsq(signatureValue);
          }, 6000);

          // initialise and subcribe to payment link information
          const tsqSign = new Pusher(PUSHER_TSQ_APP_KEY, {
            cluster: "mt1",
          });
          const tsqSubscribe = tsqSign.subscribe(PUSHER_TSQ_CHANNEL_KEY);

          tsqSubscribe.bind("data", function (data) {
            // Call the callback function with the updated data
            if (data?.data !== "Pending") {
              const tsqResponse = data?.data;
              clearInterval(fetchDatInterval);
              clearInterval(signatureInterval);
              removeSubscription();
              tsqSubscribe.unsubscribe(PUSHER_TSQ_CHANNEL_KEY);
              tsqSubscribe.unbind();
              successModal({
                ...tsqResponse,
                email: modalProps?.data?.email,
                redirect_link: modalProps?.merchantConfig?.redirect_link,
              });
              awaitingIframe.removeEventListener("load", handleIframeLoad);
              awaitingIframe.style.display = "none";
              Awaitingmodal.style.display = "none";
              var childNodes = document.body.childNodes;
              var desiredChild = null;
              for (var i = 0; i < childNodes.length; i++) {
                if (
                  childNodes[i].id === "pooler-iframe" ||
                  childNodes[i].id === "merchant-iframe"
                ) {
                  desiredChild = childNodes[i];
                  break;
                }
              }
              if (desiredChild) {
                var parent = desiredChild.parentNode;
                parent.removeChild(desiredChild);
              }
            } else {
              removeSubscription();
              tsqSubscribe.unsubscribe(PUSHER_TSQ_CHANNEL_KEY);
              tsqSubscribe.unbind();
              onFailure({ ...modalProps });
              awaitingIframe.removeEventListener("load", handleIframeLoad);
              awaitingIframe.style.display = "none";
              var childNodes = document.body.childNodes;
              var desiredChild = null;
              for (var i = 0; i < childNodes.length; i++) {
                if (
                  childNodes[i].id === "pooler-iframe" ||
                  childNodes[i].id === "merchant-iframe"
                ) {
                  desiredChild = childNodes[i];
                  break;
                }
              }
              if (desiredChild) {
                var parent = desiredChild.parentNode;
                parent.removeChild(desiredChild);
              }
            }
          });
        });
      };
      document.head.appendChild(script);
    }
    awaitingIframe.addEventListener("load", handleIframeLoad);
    document.body.appendChild(awaitingIframe);

    // CHECK AWAITING RE-RENDER
    var awaitingRemove = "awaiting-iframe";
    var awaitingWithId = document.querySelectorAll(
      '[id="' + awaitingRemove + '"]'
    );

    if (awaitingWithId.length > 1) {
      // Keep the first element and remove the rest
      for (var i = 1; i < awaitingWithId.length; i++) {
        awaitingWithId[i].parentNode.removeChild(awaitingWithId[i]);
      }
    }

    // fetch(`${BASE_URL}/initialize`, { method: "GET" }).then().catch();

    closeBtn.addEventListener("click", function () {
      awaitingIframe.parentNode.removeChild(awaitingIframe);
      Awaitingmodal.style.display = "none";
      overlay.style.display = "none";
      var childNodes = document.body.childNodes;
      var desiredChild = null;
      // for (var i = 0; i < childNodes.length; i++) {
      //   if (childNodes[i].id === "awaiting-iframe") {
      //     desiredChild = childNodes[i];
      //     break;
      //   }
      // }
      // if (desiredChild) {
      //   var parent = desiredChild.parentNode;
      //   parent.removeChild(desiredChild);
      // }
    });

    function handleMerchantEffect() {
      var idToRemove = "merchant-iframe";
      var elementsWithId = document.querySelectorAll(
        '[id="' + idToRemove + '"]'
      );

      if (elementsWithId.length > 0) {
        // Keep the first element and remove the rest
        for (var i = 0; i < elementsWithId.length; i++) {
          elementsWithId[i].parentNode.removeChild(elementsWithId[i]);
        }
      }
    }
  }

  // SUCCESS MODAL, establishes that payments was successful
  function successModal(data) {
    // spins up iframe for success modal
    var successIframe = document.createElement("iframe");
    successIframe.id = "success-iframe";
    successIframe.style.position = "fixed";
    successIframe.style.top = "0";
    successIframe.style.left = "0";
    successIframe.style.width = "100%";
    successIframe.style.height = "100%";
    successIframe.style.border = "none";
    successIframe.style.display = "flex";

    var modal = document.createElement("div");
    modal.setAttribute("id", "success-modal");
    // modal.className = "modal";
    modal.style.display = "block";
    modal.style.position = "fixed";
    modal.style.zIndex = "9999";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.paddingTop = "100px";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.overflow = "auto";
    modal.style.backgroundColor = "rgb(0, 0, 0, 0.5)";
    var modalContent = document.createElement("div");

    // modalContent.className = "modal-content";
    modalContent.style.backgroundColor = "#fefefe";
    modalContent.style.margin = "auto";
    modalContent.style.width = "100%";
    modalContent.style.borderRadius = "8px";
    modalContent.style.position = "relative";
    modalContent.style.maxWidth = "450px";
    modalContent.style.boxShadow = "0 4px 15px 0 rgba(0,0,0,.5)";

    var closeBtn = document.createElement("div");
    closeBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 7L7 17M7 7L17 17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    // closeBtn.className = "close close-img";
    closeBtn.style.color = "#000";
    closeBtn.style.float = "right";
    closeBtn.style.marginTop = "0px";
    closeBtn.style.position = "absolute";
    closeBtn.style.right = "-2%";
    closeBtn.style.top = "-2%";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.backgroundColor = "#FAFAFD";
    closeBtn.style.padding = "2px 3px";
    closeBtn.style.borderRadius = "100%";

    // modal text parent
    var modalTextParent = document.createElement("div");
    // modalTextParent.className = "modal-text-parent";
    modalTextParent.style.background = "#F5F6FB";
    modalTextParent.style.borderTopLeftRadius = "8px";
    modalTextParent.style.borderTopRightRadius = "8px";
    modalTextParent.style.borderBottom = "1px solid #e0e4f4";
    modalTextParent.style.padding = "20px";
    modalContent.appendChild(modalTextParent);

    // modal header
    var modalText = document.createElement("div");
    // modalText.className = "modal-header";
    modalText.style.display = "flex";
    modalText.style.flexDirection = "row";
    modalText.style.alignItems = "center";
    modalText.style.justifyContent = "space-between";

    // pooler image icon
    var poolerIcon = document.createElement("div");
    // poolerIcon.innerHTML = poolerLogo;
    poolerIcon.innerHTML = `<svg width="122" height="32" viewBox="0 0 122 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.383 12.1136L22.9586 10.5829C22.6293 10.4051 22.2876 10.2508 21.936 10.121C20.985 9.75941 19.9744 9.57471 18.9553 9.57618H9.65918L11.1286 26.7961H15.7526V25.9878H18.9553C20.0471 25.9878 21.1283 25.7753 22.137 25.3628C23.1457 24.9502 24.0622 24.3454 24.8341 23.5829C25.606 22.8205 26.2182 21.9154 26.6358 20.9193C27.0535 19.9232 27.2682 18.8556 27.2677 17.7776V17.742C27.251 16.0846 26.6098 14.4928 25.4684 13.2772L24.383 12.1136Z" fill="#52A1FF"/>
<path d="M25.166 15.594C25.1664 16.6723 24.9516 17.7401 24.5338 18.7364C24.116 19.7327 23.5035 20.638 22.7313 21.4004C21.9591 22.1629 21.0422 22.7676 20.0332 23.1801C19.0241 23.5926 17.9426 23.8047 16.8505 23.8043H13.6508V26.7888H7.56641V7.38673H16.8625C18.3194 7.38485 19.7511 7.76275 21.0127 8.4822L22.9649 10.5785L23.3098 10.9515C24.4908 12.2029 25.1551 13.8452 25.172 15.5555L25.166 15.594Z" fill="#1F7AFF"/>
<path d="M22.6592 13.4573C22.6599 15.633 21.7858 17.72 20.2287 19.2595C18.6717 20.7991 16.5592 21.6652 14.3556 21.6676H11.141V26.7897H5.05957V5.25H14.3556C15.6236 5.25052 16.8746 5.53795 18.0125 6.09023C19.1504 6.64248 20.145 7.44487 20.9199 8.4358C22.0484 9.87702 22.6601 11.6474 22.6592 13.4691V13.4573Z" fill="#2C1DFF"/>
<path d="M35.9932 26.5767H39.8383V18.9557H42.7293C47.1526 18.9557 50.3038 17.0784 50.3038 12.8476V12.7356C50.3038 8.53281 47.2682 6.5435 42.6426 6.5435H35.9932V26.5767ZM39.8383 16.2659V9.4294H42.6426C45.1 9.4294 46.5455 10.354 46.5455 12.7356V12.8476C46.5455 15.0611 45.1867 16.2659 42.6426 16.2659H39.8383Z" fill="black"/>
<path d="M59.0847 24.2231C56.425 24.2231 54.8927 22.3459 54.8927 19.3479V19.1238C54.8927 16.0978 56.4828 14.2766 59.0847 14.2766C61.6867 14.2766 63.2478 16.1258 63.2478 19.1518V19.3479C63.2478 22.3459 61.6867 24.2231 59.0847 24.2231ZM59.0558 26.8569C63.508 26.8569 66.8327 23.8869 66.8327 19.3199V19.0958C66.8327 14.6128 63.508 11.6148 59.0847 11.6148C54.6325 11.6148 51.3078 14.6408 51.3078 19.1798V19.404C51.3078 23.8589 54.6036 26.8569 59.0558 26.8569Z" fill="black"/>
<path d="M76.1803 24.2231C73.5205 24.2231 71.9883 22.3459 71.9883 19.3479V19.1238C71.9883 16.0978 73.5783 14.2766 76.1803 14.2766C78.7822 14.2766 80.3434 16.1258 80.3434 19.1518V19.3479C80.3434 22.3459 78.7822 24.2231 76.1803 24.2231ZM76.1514 26.8569C80.6036 26.8569 83.9283 23.8869 83.9283 19.3199V19.0958C83.9283 14.6128 80.6036 11.6148 76.1803 11.6148C71.7281 11.6148 68.4034 14.6408 68.4034 19.1798V19.404C68.4034 23.8589 71.6992 26.8569 76.1514 26.8569Z" fill="black"/>
<path d="M86.5975 26.5767H90.0957V5.14258H86.5975V26.5767Z" fill="black"/>
<path d="M100.431 26.8569C104.305 26.8569 106.878 25.1758 107.369 22.0937H103.987C103.727 23.5227 102.628 24.3352 100.517 24.3352C97.9155 24.3352 96.47 22.7662 96.3544 19.9923H107.427V19.0117C107.427 13.7723 104.045 11.6148 100.286 11.6148C95.9785 11.6148 92.7695 14.6408 92.7695 19.1798V19.404C92.7695 24.027 95.9785 26.8569 100.431 26.8569ZM96.4122 17.7229C96.7591 15.4534 98.1757 14.0805 100.286 14.0805C102.454 14.0805 103.784 15.2012 103.958 17.7229H96.4122Z" fill="black"/>
<path d="M109.973 26.5767H113.472V18.9557C113.472 15.8456 115.322 14.893 118.386 14.865V11.6989C115.842 11.7269 114.426 12.8196 113.472 14.6688V11.923H109.973V26.5767Z" fill="black"/>
</svg>
`;
    poolerIcon.style.width = "32px";
    poolerIcon.style.height = "32px";
    modalText.appendChild(poolerIcon);

    // amount and email address column
    var modalAmountEmail = document.createElement("div");
    // modalAmountEmail.className = "modal-amt-email";
    modalAmountEmail.style.display = "flex";
    modalAmountEmail.style.flexDirection = "column";
    modalAmountEmail.style.marginTop = "0.25rem";
    modalAmountEmail.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    modalAmountEmail.style.fontSize = "1rem";
    modalText.appendChild(modalAmountEmail);
    modalTextParent.appendChild(modalText);

    // amount
    var modalAmount = document.createElement("div");
    // modalAmount.className = "modal-amount modal-amt";
    modalAmount.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    modalAmount.style.fontWeight = "600";
    modalAmount.style.color = "#000";
    modalAmount.style.textAlign = "end";
    modalAmount.style.textAlign = "right";
    modalAmount.style.fontSize = "1.125rem";
    modalAmount.style.paddingBottom = "8px";
    // modalAmount.textContent = `NGN${data?.amount}`;
    modalAmount.textContent = `${data?.currency_code || "NGN"}${data?.amount}`;
    modalAmountEmail.appendChild(modalAmount);

    // email
    var modalEmail = document.createElement("div");
    // modalEmail.className = "modal-email modal-em";
    modalEmail.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    modalEmail.style.color = "#8f9bb2";
    modalEmail.style.fontStyle = "normal";
    modalEmail.style.fontSize = "1rem";
    modalEmail.textContent = `${data?.email}`;
    modalAmountEmail.appendChild(modalEmail);

    // modal body
    var modalBody = document.createElement("div");
    // modalBody.className = "modal-body";
    modalBody.style.display = "flex";
    modalBody.style.flexDirection = "column";
    modalBody.style.position = "relative";
    modalBody.style.justifyContent = "center";
    modalBody.style.paddingTop = "25px";
    modalBody.style.paddingBottom = "25px";

    // SUCCESS CONTAINER
    var successContainer = document.createElement("div");
    successContainer.style.background = "#F5F6FB";
    successContainer.style.width = "90%";
    successContainer.style.margin = "auto";
    successContainer.style.display = "flex";
    successContainer.style.flexDirection = "column";
    successContainer.style.paddingTop = "1.5rem";
    successContainer.style.paddingBottom = "1.5rem";
    successContainer.style.borderRadius = "0.5rem";
    modalBody.appendChild(successContainer);

    // loader
    var successIcon = document.createElement("div");
    successIcon = `<svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: auto; text-align: center; padding-bottom: 10px; padding-top: 10px;">
  <g filter="url(#filter0_d_365_8137)">
  <circle cx="39" cy="39" r="39" fill="white"/>
  </g>
  <circle cx="39" cy="39" r="34.125" fill="#C8DEC4"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M64.1703 62.0431C69.7315 55.9718 73.125 47.8822 73.125 39C73.125 29.7908 69.4771 21.4337 63.5475 15.2947C62.9874 15.2547 62.4218 15.2344 61.8516 15.2344C48.8944 15.2344 38.3906 25.7382 38.3906 38.6953C38.3906 51.6524 48.8944 62.1562 61.8516 62.1562C62.634 62.1562 63.4075 62.1179 64.1703 62.0431Z" fill="#9AC693"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M70.4296 52.3153C72.1651 48.224 73.125 43.7241 73.125 39C73.125 34.2759 72.1651 29.776 70.4296 25.6847C69.9146 25.6246 69.3906 25.5938 68.8594 25.5938C61.4553 25.5938 55.4531 31.5959 55.4531 39C55.4531 46.4041 61.4553 52.4062 68.8594 52.4062C69.3906 52.4062 69.9146 52.3754 70.4296 52.3153Z" fill="#128100"/>
  <path d="M48.75 31.6875L35.3438 45.0938L29.25 39" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <defs>
  <filter id="filter0_d_365_8137" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset dx="2" dy="2"/>
  <feComposite in2="hardAlpha" operator="out"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_365_8137"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_365_8137" result="shape"/>
  </filter>
  </defs>
  </svg>
  `;
    successContainer.innerHTML = successIcon;

    // success confirmation
    var successConfirmation = document.createElement("div");
    successConfirmation.textContent = "Money received!";
    successConfirmation.className = "transferToMerchant modal-amount";
    successConfirmation.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    successConfirmation.style.textAlign = "center";
    successConfirmation.style.paddingTop = "10px";
    successConfirmation.style.paddingBottom = "15px";
    successContainer.appendChild(successConfirmation);

    var successMessage = document.createElement("div");
    successMessage.className = "awaiting-message modal-email";
    successMessage.textContent = "Your transaction have been confirmed.";
    successMessage.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    successMessage.style.color = "#8f9bb2";
    successMessage.style.textAlign = "center";
    successMessage.style.marginLeft = "auto";
    successMessage.style.marginRight = "auto";
    successContainer.appendChild(successMessage);

    // secure by pooler
    var secureTextContainer = document.createElement("div");
    // secureTextContainer.className = "absolute footer-text";
    secureTextContainer.style.position = "absolute";
    secureTextContainer.style.top = "103%";
    secureTextContainer.style.left = "27%";
    secureTextContainer.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    var htmlContent = document.createElement("div");
    htmlContent.style.display = "flex";
    htmlContent.style.flexDirection = "row";
    htmlContent.style.paddingTop = "8px";
    htmlContent.style.color = "white";
    htmlContent.style.alignItems = "center";
    var htmlContent = `<div style="color: #fff; display: flex; align-items: center; gap: "20px"; flex: row; align-items: center;"><p>Secured by</p><span><svg width="94" height="24" viewBox="0 0 94 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.787 9.08492L17.6895 7.9369C17.4357 7.8036 17.1724 7.68782 16.9016 7.59047C16.1688 7.31931 15.3902 7.18079 14.6049 7.18189H7.44238L8.57455 20.0968H12.1373V19.4906H14.6049C15.4462 19.4906 16.2792 19.3312 17.0565 19.0219C17.8337 18.7124 18.5398 18.2588 19.1346 17.6869C19.7293 17.1151 20.201 16.4363 20.5228 15.6892C20.8446 14.9421 21.01 14.1415 21.0096 13.3329V13.3063C20.9968 12.0632 20.5027 10.8693 19.6233 9.95762L18.787 9.08492Z" fill="#52A1FF"/>
    <path d="M19.3899 11.696C19.3902 12.5047 19.2247 13.3056 18.9028 14.0528C18.581 14.8 18.109 15.479 17.514 16.0508C16.919 16.6227 16.2126 17.0762 15.4351 17.3856C14.6576 17.6949 13.8244 17.854 12.9829 17.8537H10.5176V20.0921H5.82959V5.54053H12.9921C14.1147 5.53913 15.2178 5.82255 16.1899 6.36214L17.694 7.93433L17.9597 8.21411C18.8697 9.15265 19.3815 10.3844 19.3945 11.6671L19.3899 11.696Z" fill="#1F7AFF"/>
    <path d="M17.4583 10.093C17.4589 11.7247 16.7853 13.29 15.5857 14.4446C14.386 15.5993 12.7583 16.2489 11.0605 16.2507H8.58365V20.0923H3.89795V3.9375H11.0605C12.0375 3.93789 13.0013 4.15346 13.8781 4.56767C14.7548 4.98186 15.5211 5.58366 16.1182 6.32685C16.9877 7.40777 17.459 8.73559 17.4583 10.1019V10.093Z" fill="#2C1DFF"/>
    <path d="M27.7319 19.9327H30.6945V14.2169H32.9221C36.3302 14.2169 38.7582 12.809 38.7582 9.63592V9.55186C38.7582 6.39979 36.4193 4.90781 32.8552 4.90781H27.7319V19.9327ZM30.6945 12.1996V7.07223H32.8552C34.7486 7.07223 35.8624 7.76569 35.8624 9.55186V9.63592C35.8624 11.296 34.8155 12.1996 32.8552 12.1996H30.6945Z" fill="white"/>
    <path d="M45.5238 18.1675C43.4745 18.1675 42.2939 16.7596 42.2939 14.5111V14.343C42.2939 12.0735 43.519 10.7076 45.5238 10.7076C47.5286 10.7076 48.7314 12.0945 48.7314 14.364V14.5111C48.7314 16.7596 47.5286 18.1675 45.5238 18.1675ZM45.5015 20.1428C48.9319 20.1428 51.4936 17.9154 51.4936 14.4901V14.322C51.4936 10.9598 48.9319 8.71131 45.5238 8.71131C42.0934 8.71131 39.5317 10.9808 39.5317 14.385V14.5532C39.5317 17.8944 42.0711 20.1428 45.5015 20.1428Z" fill="white"/>
    <path d="M58.6958 18.1675C56.6465 18.1675 55.4659 16.7596 55.4659 14.5111V14.343C55.4659 12.0735 56.691 10.7076 58.6958 10.7076C60.7006 10.7076 61.9034 12.0945 61.9034 14.364V14.5111C61.9034 16.7596 60.7006 18.1675 58.6958 18.1675ZM58.6735 20.1428C62.1039 20.1428 64.6656 17.9154 64.6656 14.4901V14.322C64.6656 10.9598 62.1039 8.71131 58.6958 8.71131C55.2654 8.71131 52.7037 10.9808 52.7037 14.385V14.5532C52.7037 17.8944 55.2431 20.1428 58.6735 20.1428Z" fill="white"/>
    <path d="M66.7222 19.9327H69.4175V3.85712H66.7222V19.9327Z" fill="white"/>
    <path d="M77.3806 20.1428C80.3655 20.1428 82.348 18.882 82.7266 16.5705H80.1204C79.9199 17.6422 79.0735 18.2516 77.4474 18.2516C75.4426 18.2516 74.3289 17.0748 74.2398 14.9944H82.7712V14.259C82.7712 10.3294 80.165 8.71131 77.2692 8.71131C73.9502 8.71131 71.4776 10.9808 71.4776 14.385V14.5532C71.4776 18.0204 73.9502 20.1428 77.3806 20.1428ZM74.2843 13.2923C74.5516 11.5902 75.6431 10.5605 77.2692 10.5605C78.9398 10.5605 79.9645 11.4011 80.0982 13.2923H74.2843Z" fill="white"/>
    <path d="M84.7332 19.9327H87.4285V14.2169C87.4285 11.8844 88.8541 11.1699 91.2153 11.1489V8.77435C89.255 8.79537 88.1635 9.6149 87.4285 11.0018V8.94246H84.7332V19.9327Z" fill="white"/>
    </svg>
    </span></div>`;

    secureTextContainer.innerHTML = htmlContent;
    modalContent.appendChild(secureTextContainer);

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    // document.body.appendChild(modal);

    successIframe.addEventListener("load", () => {
      var iframeWindow = successIframe.contentWindow;
      iframeWindow.document.body.appendChild(modal);
    });
    document.body.appendChild(successIframe);

    setTimeout(() => {
      window.location.replace(data?.redirect_link);
    }, 3000);

    // HANDLE EFFECTS ON SUCCESS
    var successRemove = "success-iframe";
    var successWithIframe = document.querySelectorAll(
      '[id="' + successRemove + '"]'
    );
    if (successWithIframe.length > 1) {
      // Keep the first element and remove the rest
      for (var i = 1; i < successWithIframe.length; i++) {
        successWithIframe[i].parentNode.removeChild(successWithIframe[i]);
      }
    }

    // CHECK FOR OTHER EFFECTS
    var iframeRemove = "pooler-iframe";
    var elementsWithIframe = document.querySelectorAll(
      '[id="' + iframeRemove + '"]'
    );
    if (elementsWithIframe.length > 0) {
      // Keep the first element and remove the rest
      for (var i = 0; i < elementsWithIframe.length; i++) {
        elementsWithIframe[i].parentNode.removeChild(elementsWithIframe[i]);
      }
    }

    var awaitingIframeRemove = "awaiting-iframe";
    var awaitingSelector = document.querySelectorAll(
      '[id="' + awaitingIframeRemove + '"]'
    );
    if (awaitingSelector.length > 0) {
      // Keep the first element and remove the rest
      for (var i = 0; i < awaitingSelector.length; i++) {
        awaitingSelector[i].parentNode.removeChild(awaitingSelector[i]);
      }
    }

    var errorToRemove = "error-iframe";
    var errorWithId = document.querySelectorAll('[id="' + errorToRemove + '"]');

    if (errorWithId.length > 0) {
      // Keep the first element and remove the rest
      for (var i = 0; i < errorWithId.length; i++) {
        errorWithId[i].parentNode.removeChild(errorWithId[i]);
      }
    }

    var sessionRemove = "session-iframe";
    var sessionWithIframe = document.querySelectorAll(
      '[id="' + sessionRemove + '"]'
    );
    if (sessionWithIframe.length > 1) {
      // Keep the first element and remove the rest
      for (var i = 1; i < sessionWithIframe.length; i++) {
        sessionWithIframe[i].parentNode.removeChild(sessionWithIframe[i]);
      }
    }

    closeBtn.addEventListener("click", function () {
      window.location.replace(data?.redirect_link);
      modal.style.display = "none";
      modal.parentNode.removeChild(modal);
      var childNodes = document.body.childNodes;
      var desiredChild = null;
      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i].id === "success-modal") {
          desiredChild = childNodes[i];
          break;
        }
      }
      if (desiredChild) {
        var parent = desiredChild.parentNode;
        parent.removeChild(desiredChild);
        console.log("yeah");
      }
    });
  }

  // session expiration and error handling modal
  function showSessionExpirationModal(data) {
    // spins up session expiration iframe
    const controller = new AbortController();
    const signal = controller.signal;

    var sessionIframe = document.createElement("iframe");
    sessionIframe.id = "session-iframe";
    sessionIframe.style.position = "fixed";
    sessionIframe.style.top = "0";
    sessionIframe.style.left = "0";
    sessionIframe.style.width = "100%";
    sessionIframe.style.height = "100%";
    sessionIframe.style.border = "none";
    sessionIframe.style.display = "flex";

    var sessionmodal = document.createElement("div");
    sessionmodal.setAttribute("id", "session-modal");
    // modal.className = "modal";
    sessionmodal.style.display = "block";
    sessionmodal.style.position = "fixed";
    sessionmodal.style.zIndex = "9999";
    sessionmodal.style.top = "0";
    sessionmodal.style.left = "0";
    sessionmodal.style.paddingTop = "63px";
    sessionmodal.style.width = "100%";
    sessionmodal.style.height = "100%";
    sessionmodal.style.overflow = "auto";
    sessionmodal.style.backgroundColor = "rgb(0, 0, 0, 0.3)";

    var modalContent = document.createElement("div");
    // modalContent.className = "modal-content";
    modalContent.style.backgroundColor = "#fefefe";
    modalContent.style.margin = "auto";
    modalContent.style.width = "100%";
    modalContent.style.borderRadius = "8px";
    modalContent.style.position = "relative";
    modalContent.style.maxWidth = "450px";
    modalContent.style.boxShadow = "0 4px 15px 0 rgba(0,0,0,.2)";

    var closeBtn = document.createElement("div");
    closeBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 7L7 17M7 7L17 17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

    // closeBtn.className = "close close-img";
    closeBtn.style.color = "#000";
    closeBtn.style.float = "right";
    closeBtn.style.marginTop = "0px";
    closeBtn.style.position = "absolute";
    closeBtn.style.right = "-2%";
    closeBtn.style.top = "-2%";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.backgroundColor = "#FAFAFD";
    closeBtn.style.padding = "2px 3px";
    closeBtn.style.borderRadius = "100%";

    // modal text parent
    var modalTextParent = document.createElement("div");
    // modalTextParent.className = "modal-text-parent";
    modalTextParent.style.background = "#F5F6FB";
    modalTextParent.style.borderTopLeftRadius = "8px";
    modalTextParent.style.borderTopRightRadius = "8px";
    modalTextParent.style.borderBottom = "1px solid #e0e4f4";
    modalTextParent.style.padding = "20px";
    modalContent.appendChild(modalTextParent);

    // modal header
    var modalText = document.createElement("div");
    modalText.style.display = "flex";
    modalText.style.flexDirection = "row";
    modalText.style.alignItems = "center";
    modalText.style.justifyContent = "space-between";

    // pooler image icon
    var poolerIcon = document.createElement("div");
    // poolerIcon.innerHTML = poolerLogo;
    poolerIcon.innerHTML = `<svg width="122" height="32" viewBox="0 0 122 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M24.383 12.1136L22.9586 10.5829C22.6293 10.4051 22.2876 10.2508 21.936 10.121C20.985 9.75941 19.9744 9.57471 18.9553 9.57618H9.65918L11.1286 26.7961H15.7526V25.9878H18.9553C20.0471 25.9878 21.1283 25.7753 22.137 25.3628C23.1457 24.9502 24.0622 24.3454 24.8341 23.5829C25.606 22.8205 26.2182 21.9154 26.6358 20.9193C27.0535 19.9232 27.2682 18.8556 27.2677 17.7776V17.742C27.251 16.0846 26.6098 14.4928 25.4684 13.2772L24.383 12.1136Z" fill="#52A1FF"/>
  <path d="M25.166 15.594C25.1664 16.6723 24.9516 17.7401 24.5338 18.7364C24.116 19.7327 23.5035 20.638 22.7313 21.4004C21.9591 22.1629 21.0422 22.7676 20.0332 23.1801C19.0241 23.5926 17.9426 23.8047 16.8505 23.8043H13.6508V26.7888H7.56641V7.38673H16.8625C18.3194 7.38485 19.7511 7.76275 21.0127 8.4822L22.9649 10.5785L23.3098 10.9515C24.4908 12.2029 25.1551 13.8452 25.172 15.5555L25.166 15.594Z" fill="#1F7AFF"/>
  <path d="M22.6592 13.4573C22.6599 15.633 21.7858 17.72 20.2287 19.2595C18.6717 20.7991 16.5592 21.6652 14.3556 21.6676H11.141V26.7897H5.05957V5.25H14.3556C15.6236 5.25052 16.8746 5.53795 18.0125 6.09023C19.1504 6.64248 20.145 7.44487 20.9199 8.4358C22.0484 9.87702 22.6601 11.6474 22.6592 13.4691V13.4573Z" fill="#2C1DFF"/>
  <path d="M35.9932 26.5767H39.8383V18.9557H42.7293C47.1526 18.9557 50.3038 17.0784 50.3038 12.8476V12.7356C50.3038 8.53281 47.2682 6.5435 42.6426 6.5435H35.9932V26.5767ZM39.8383 16.2659V9.4294H42.6426C45.1 9.4294 46.5455 10.354 46.5455 12.7356V12.8476C46.5455 15.0611 45.1867 16.2659 42.6426 16.2659H39.8383Z" fill="black"/>
  <path d="M59.0847 24.2231C56.425 24.2231 54.8927 22.3459 54.8927 19.3479V19.1238C54.8927 16.0978 56.4828 14.2766 59.0847 14.2766C61.6867 14.2766 63.2478 16.1258 63.2478 19.1518V19.3479C63.2478 22.3459 61.6867 24.2231 59.0847 24.2231ZM59.0558 26.8569C63.508 26.8569 66.8327 23.8869 66.8327 19.3199V19.0958C66.8327 14.6128 63.508 11.6148 59.0847 11.6148C54.6325 11.6148 51.3078 14.6408 51.3078 19.1798V19.404C51.3078 23.8589 54.6036 26.8569 59.0558 26.8569Z" fill="black"/>
  <path d="M76.1803 24.2231C73.5205 24.2231 71.9883 22.3459 71.9883 19.3479V19.1238C71.9883 16.0978 73.5783 14.2766 76.1803 14.2766C78.7822 14.2766 80.3434 16.1258 80.3434 19.1518V19.3479C80.3434 22.3459 78.7822 24.2231 76.1803 24.2231ZM76.1514 26.8569C80.6036 26.8569 83.9283 23.8869 83.9283 19.3199V19.0958C83.9283 14.6128 80.6036 11.6148 76.1803 11.6148C71.7281 11.6148 68.4034 14.6408 68.4034 19.1798V19.404C68.4034 23.8589 71.6992 26.8569 76.1514 26.8569Z" fill="black"/>
  <path d="M86.5975 26.5767H90.0957V5.14258H86.5975V26.5767Z" fill="black"/>
  <path d="M100.431 26.8569C104.305 26.8569 106.878 25.1758 107.369 22.0937H103.987C103.727 23.5227 102.628 24.3352 100.517 24.3352C97.9155 24.3352 96.47 22.7662 96.3544 19.9923H107.427V19.0117C107.427 13.7723 104.045 11.6148 100.286 11.6148C95.9785 11.6148 92.7695 14.6408 92.7695 19.1798V19.404C92.7695 24.027 95.9785 26.8569 100.431 26.8569ZM96.4122 17.7229C96.7591 15.4534 98.1757 14.0805 100.286 14.0805C102.454 14.0805 103.784 15.2012 103.958 17.7229H96.4122Z" fill="black"/>
  <path d="M109.973 26.5767H113.472V18.9557C113.472 15.8456 115.322 14.893 118.386 14.865V11.6989C115.842 11.7269 114.426 12.8196 113.472 14.6688V11.923H109.973V26.5767Z" fill="black"/>
  </svg>
  `;
    poolerIcon.style.width = "32px";
    poolerIcon.style.height = "32px";
    modalText.appendChild(poolerIcon);

    // amount and email address column
    var modalAmountEmail = document.createElement("div");
    // modalAmountEmail.className = "modal-amt-email";
    modalAmountEmail.style.display = "flex";
    modalAmountEmail.style.flexDirection = "column";
    modalAmountEmail.style.marginTop = "0.25rem";
    modalText.appendChild(modalAmountEmail);
    modalTextParent.appendChild(modalText);

    // amount
    var modalAmount = document.createElement("div");
    // modalAmount.className = "modal-amount modal-amt";
    modalAmount.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    modalAmount.style.fontWeight = "600";
    modalAmount.style.color = "#000";
    modalAmount.style.textAlign = "end";
    modalAmount.style.textAlign = "right";
    modalAmount.style.fontSize = "1.125rem";
    modalAmount.style.paddingBottom = "8px";
    modalAmount.textContent = `${data?.data?.currency_code || "NGN"}${
      data?.data?.amount
    }`;
    modalAmountEmail.appendChild(modalAmount);

    // email
    var modalEmail = document.createElement("div");
    // modalEmail.className = "modal-email modal-em";
    modalEmail.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    modalEmail.style.color = "#8f9bb2";
    modalEmail.style.fontStyle = "normal";
    modalEmail.style.fontSize = "1rem";
    modalEmail.textContent = `${data?.data?.email}`;
    modalAmountEmail.appendChild(modalEmail);

    // modal body
    var modalBody = document.createElement("div");
    // modalBody.className = "modal-body";
    modalBody.style.display = "flex";
    modalBody.style.flexDirection = "column";
    modalBody.style.position = "relative";
    modalBody.style.justifyContent = "center";
    modalBody.style.paddingTop = "25px";

    // merchant details
    var paymentDetails = document.createElement("ul");
    // paymentDetails.className = "payment-details";
    paymentDetails.style.listStyleType = "none";
    paymentDetails.style.display = "flex";
    paymentDetails.style.flexDirection = "column";
    paymentDetails.style.width = "79%";
    paymentDetails.style.marginBottom = "30px";
    paymentDetails.style.position = "relative";
    paymentDetails.style.marginTop = "30px";

    // SUCCESS CONTAINER
    var successContainer = document.createElement("div");
    successContainer.style.background = "#F5F6FB";
    // successContainer.className = "awaiting-container";
    successContainer.style.alignItems = "center";
    successContainer.style.display = "flex";
    successContainer.style.flexDirection = "column";
    successContainer.style.borderRadius = "0.5rem";
    successContainer.style.margin = "auto";
    successContainer.style.width = "90%";
    successContainer.style.paddingTop = "1.5rem";
    successContainer.style.paddingBottom = "1.5rem";
    successContainer.style.marginTop = "25px";
    successContainer.style.marginBottom = "35px";
    successContainer.style.justifyContent = "center";
    successContainer.style.marginTop = "30px";
    successContainer.style.margin = "auto";
    modalBody.appendChild(successContainer);

    // loader
    var successIcon = document.createElement("div");
    successIcon = `<svg width="93" height="67" viewBox="0 0 93 67" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: auto; text-align: center; padding-bottom: 15px">
      <g filter="url(#filter0_d_467_8419)">
      <rect width="91" height="65" rx="4" fill="white"/>
      </g>
      <rect x="5" y="5" width="81" height="55" rx="2" fill="#FFE5EC"/>
      <path d="M5 7C5 5.89543 5.89543 5 7 5H63V44C63 45.1046 62.1046 46 61 46H5V7Z" fill="#FFCCD8"/>
      <path d="M5 7C5 5.89543 5.89543 5 7 5H39V28C39 29.1046 38.1046 30 37 30H5V7Z" fill="#FF99B1"/>
      <circle cx="66.5" cy="40.5" r="14.5" fill="#FF003D"/>
      <path d="M67 33L67 42" stroke="white" stroke-width="4" stroke-linecap="round"/>
      <path d="M67 48L67 49" stroke="white" stroke-width="4" stroke-linecap="round"/>
      <defs>
      <filter id="filter0_d_467_8419" x="0" y="0" width="93" height="67" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="2" dy="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_467_8419"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_467_8419" result="shape"/>
      </filter>
      </defs>
      </svg>`;
    successContainer.innerHTML = successIcon;

    var awaitingConfirmation = document.createElement("div");
    awaitingConfirmation.textContent = "Session expired!";
    awaitingConfirmation.style.fontFamily = "GraphikMedium, sans-serif";
    awaitingConfirmation.style.paddingTop = "5px";
    awaitingConfirmation.style.fontFamily = "GraphikRegular, sans-serif";
    awaitingConfirmation.style.textAlign = "center";
    awaitingConfirmation.style.fontSize = "16px";
    awaitingConfirmation.style.paddingTop = "20px";
    awaitingConfirmation.className = "transferToMerchant modal-amount";
    successContainer.appendChild(awaitingConfirmation);

    var successMessage = document.createElement("div");
    successMessage.className = "awaiting-message modal-email";
    successMessage.style.fontFamily = "GraphikRegular, sans-serif";
    successMessage.style.margin = "auto";
    successMessage.style.width = "80%";
    successMessage.style.fontSize = "14px";
    successMessage.style.textAlign = "center";
    successMessage.style.paddingTop = "20px";
    successMessage.style.color = "#000";
    successMessage.textContent = "Transaction time has elapsed.";
    successContainer.appendChild(successMessage);

    // LIST 1
    var li1 = document.createElement("li");
    // li1.className = "payment-detail";
    li1.style.display = "flex";
    li1.style.flexDirection = "column";
    li1.style.alignItems = "left";
    li1.style.justifyContent = "space-between";
    li1.style.borderBottom = "1px solid #e5e7eb";
    li1.style.paddingTop = "0.9em";
    li1.style.paddingBottom = "0.9em";
    var merchant = document.createElement("span");
    // merchant.className = "payment-detail-text modal-email";
    merchant.textContent = "Merchant";
    var merchatName = document.createElement("span");
    // merchatName.className = "payment-detail-bold text-truncate";
    merchatName.style.fontFamily = "GraphikMedium, sans-serif";
    merchatName.style.fontWeight = "500";
    merchatName.style.color = "#000";
    merchant.style.fontFamily = "GraphikRegular, sans-serif";
    merchant.style.color = "#8f9bb2";
    merchatName.style.fontWeight = "500";
    merchatName.style.color = "#000";
    merchatName.style.marginTop = "5px";
    merchatName.textContent = `${data?.data?.display_name}`;
    li1.appendChild(merchant);
    li1.appendChild(merchatName);

    // LIST 2
    var li2 = document.createElement("li");
    // li2.className = "payment-detail";
    li2.style.display = "flex";
    li2.style.flexDirection = "column";
    li2.style.alignItems = "left";
    li2.style.justifyContent = "space-between";
    li2.style.borderBottom = "1px solid #e5e7eb";
    li2.style.paddingTop = "0.9em";
    li2.style.paddingBottom = "0.9em";
    var accNum = document.createElement("span");
    // accNum.className = "payment-detail-text modal-email";
    accNum.textContent = "Account Number";
    accNum.style.fontFamily = "GraphikRegular, sans-serif";
    accNum.style.color = "#8f9bb2";
    var accDetails = document.createElement("span");
    accDetails.className = "payment-detail-bold row-span";
    accDetails.textContent = `${data?.data?.account_no}`;
    accDetails.style.fontFamily = "GraphikMedium, sans-serif";
    accDetails.style.fontWeight = "500";
    accDetails.style.color = "#000";
    accDetails.style.display = "flex";
    accDetails.style.flexDirection = "row";
    accDetails.style.marginTop = "5px";
    var copy = document.createElement("div");
    copy.className = "copy";
    // copy.innerHTML = copyIcon;
    copy.innerHTML = `<svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 14C3.06812 14 2.60218 14 2.23463 13.8478C1.74458 13.6448 1.35523 13.2554 1.15224 12.7654C1 12.3978 1 11.9319 1 11V4.2C1 3.0799 1 2.51984 1.21799 2.09202C1.40973 1.71569 1.71569 1.40973 2.09202 1.21799C2.51984 1 3.0799 1 4.2 1H11C11.9319 1 12.3978 1 12.7654 1.15224C13.2554 1.35523 13.6448 1.74458 13.8478 2.23463C14 2.60218 14 3.06812 14 4M11.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V11.2C21 10.0799 21 9.51984 20.782 9.09202C20.5903 8.7157 20.2843 8.40973 19.908 8.21799C19.4802 8 18.9201 8 17.8 8H11.2C10.0799 8 9.51984 8 9.09202 8.21799C8.7157 8.40973 8.40973 8.7157 8.21799 9.09202C8 9.51984 8 10.0799 8 11.2V17.8C8 18.9201 8 19.4802 8.21799 19.908C8.40973 20.2843 8.7157 20.5903 9.09202 20.782C9.51984 21 10.0799 21 11.2 21Z" stroke="#CBD1EC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `;
    copy.style.width = "20px";
    copy.style.height = "20px";
    copy.style.position = "absolute";
    copy.style.left = "102%";
    copy.style.top = "47%";
    copy.style.cursor = "pointer";
    copy.addEventListener("click", function () {
      navigator.clipboard.writeText(`${data?.data?.account_no}`);
    });
    accDetails.appendChild(copy);
    li2.appendChild(accNum);
    li2.appendChild(accDetails);

    // LIST 3
    var li3 = document.createElement("li");
    // li3.className = "payment-detail";
    li3.style.borderBottom = "0px";
    li3.style.display = "flex";
    li3.style.flexDirection = "column";
    li3.style.alignItems = "left";
    li3.style.justifyContent = "space-between";
    li3.style.borderBottom = "1px solid #e5e7eb";
    li3.style.paddingTop = "0.9em";
    li3.style.paddingBottom = "0.9em";
    var bank = document.createElement("span");
    // bank.className = "payment-detail-text modal-email";
    bank.textContent = "Bank name";
    bank.style.fontFamily = "GraphikRegular, sans-serif";
    bank.style.color = "#8f9bb2";
    var bankDetails = document.createElement("span");
    // bankDetails.className = "payment-detail-bold text-truncate";
    bankDetails.textContent = `${data?.data?.bank_name}`;
    // bankDetails.style.width = "125px";
    bankDetails.style.whiteSpace = "nowrap";
    bankDetails.style.overflow = "hidden";
    bankDetails.style.textOverflow = "ellipsis";
    bankDetails.style.fontFamily = "GraphikMedium, sans-serif";
    bankDetails.style.fontWeight = "500";
    bankDetails.style.textAlign = "left";
    bankDetails.style.color = "#000";
    bankDetails.style.marginTop = "5px";
    li3.appendChild(bank);
    li3.appendChild(bankDetails);

    // UL MAKE UP
    paymentDetails.appendChild(li1);
    paymentDetails.appendChild(li2);
    paymentDetails.appendChild(li3);
    modalBody.appendChild(paymentDetails);

    // button and countdwon timer
    var modalFooter = document.createElement("div");
    // modalFooter.className = "modal-footer";
    modalFooter.style.display = "flex";
    modalFooter.style.flexDirection = "column";
    modalFooter.style.width = "100%";
    modalFooter.style.paddingTop = "0.5rem";
    modalFooter.style.paddingBottom = "1.5rem";
    var paybutton = document.createElement("button");
    // paybutton.className = "modal-req-acc-btn";
    paybutton.style.border = "1px solid #d0d5e9";
    paybutton.style.filter = "drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.05))";
    paybutton.style.borderRadius = "8px";
    paybutton.style.textAlign = "center";
    paybutton.style.width = "80%";
    paybutton.style.color = "#000";
    paybutton.style.fontWeight = "500";
    paybutton.style.fontSize = "1.125rem";
    paybutton.style.height = "2.75rem";
    paybutton.style.margin = "auto";
    paybutton.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    paybutton.textContent = "Request for new account";
    paybutton.addEventListener("click", function () {
      paybutton.textContent = "Requesting...";
      // generate new disposable account
      const script = document.createElement("script");
      script.src = "https://js.pusher.com/8.2.0/pusher.min.js";
      script.async = true;
      script.onload = function () {
        const BASE_URL = "https://websocket.inside.poolerapp.com";
        const PUSHER_SIGN_APP_KEY = "f5715eb30d0b1b069d22";
        const PUSHER_SIGN_CHANNEL_KEY = "signature_dev";
        const PUSHER_PAYMENT_APP_KEY = "926bd1302add9e673539";
        const PUSHER_PAYMENT_CHANNEL_KEY = "initialize_dev";

        const pusherSign = new Pusher(PUSHER_SIGN_APP_KEY, {
          cluster: "mt1",
        });
        const pusherSignSubscribe = pusherSign.subscribe(
          PUSHER_SIGN_CHANNEL_KEY
        );

        const removeSubscription = () => {
          pusherSignSubscribe.unsubscribe(PUSHER_SIGN_CHANNEL_KEY);
          pusherSignSubscribe.unbind();
        };

        function getSignature(callback) {
          fetch(`${BASE_URL}/initialize`, { method: "GET", signal })
            .then()
            .catch();
          pusherSignSubscribe.bind("data", function (data) {
            if (data?.data?.signature) {
              callback(data?.data?.signature);
              removeSubscription();
            }
          });
        }
        getSignature((signature) => {
          function initialisePayment() {
            var reqObject = {
              action: "initialize",
              signature: signature,
              email: config?.email,
              amount: config?.amount,
              pub_key: config?.pub_key,
              // payment_link_reference: config?.reference,
            };

            fetch(`${BASE_URL}/socket`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              signal,
              body: JSON.stringify(reqObject),
            });

            const pusherPayment = new Pusher(PUSHER_PAYMENT_APP_KEY, {
              cluster: "mt1",
            });
            const pusherPaymentSubscribe = pusherPayment.subscribe(
              PUSHER_PAYMENT_CHANNEL_KEY
            );

            function executeOnce(fn) {
              let executed = false;

              return function (...args) {
                if (!executed) {
                  executed = true;
                  fn(...args);
                }
              };
            }
            const showMerchantModalOnce = executeOnce(showMerchantModal);
            pusherPaymentSubscribe.bind("data", (data) => {
              if (data?.data?.status === "01") {
                showMerchantModalOnce({
                  data: data?.data?.data,
                  merchantConfig: config,
                });
                sessionIframe.style.display = "none";
                sessionmodal.style.display = "none";
                controller.abort();
                removeSubscription();
                pusherPaymentSubscribe.unsubscribe(PUSHER_PAYMENT_CHANNEL_KEY);
                pusherPaymentSubscribe.unbind();
              } else {
                onError(config);
                removeSubscription();
                pusherPaymentSubscribe.unsubscribe(PUSHER_PAYMENT_CHANNEL_KEY);
                pusherPaymentSubscribe.unbind();
                sessionIframe.style.display = "none";
                sessionmodal.style.display = "none";
                controller.abort();
              }
            });
          }
          initialisePayment();
        });
      };
      document.head.appendChild(script);
    });

    modalFooter.appendChild(paybutton);

    // secure by pooler
    var secureTextContainer = document.createElement("div");
    // secureTextContainer.className = "absolute footer-text";
    secureTextContainer.style.position = "absolute";
    secureTextContainer.style.top = "103%";
    secureTextContainer.style.left = "27%";
    secureTextContainer.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    var htmlContent = document.createElement("div");
    htmlContent.style.display = "flex";
    htmlContent.style.flexDirection = "row";
    htmlContent.style.paddingTop = "8px";
    htmlContent.style.color = "white";
    htmlContent.style.alignItems = "center";
    var htmlContent = `<div style="color: #fff; display: flex; align-items: center; gap: "20px"; flex: row; align-items: center;"><p>Secured by</p><span><svg width="94" height="24" viewBox="0 0 94 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.787 9.08492L17.6895 7.9369C17.4357 7.8036 17.1724 7.68782 16.9016 7.59047C16.1688 7.31931 15.3902 7.18079 14.6049 7.18189H7.44238L8.57455 20.0968H12.1373V19.4906H14.6049C15.4462 19.4906 16.2792 19.3312 17.0565 19.0219C17.8337 18.7124 18.5398 18.2588 19.1346 17.6869C19.7293 17.1151 20.201 16.4363 20.5228 15.6892C20.8446 14.9421 21.01 14.1415 21.0096 13.3329V13.3063C20.9968 12.0632 20.5027 10.8693 19.6233 9.95762L18.787 9.08492Z" fill="#52A1FF"/>
    <path d="M19.3899 11.696C19.3902 12.5047 19.2247 13.3056 18.9028 14.0528C18.581 14.8 18.109 15.479 17.514 16.0508C16.919 16.6227 16.2126 17.0762 15.4351 17.3856C14.6576 17.6949 13.8244 17.854 12.9829 17.8537H10.5176V20.0921H5.82959V5.54053H12.9921C14.1147 5.53913 15.2178 5.82255 16.1899 6.36214L17.694 7.93433L17.9597 8.21411C18.8697 9.15265 19.3815 10.3844 19.3945 11.6671L19.3899 11.696Z" fill="#1F7AFF"/>
    <path d="M17.4583 10.093C17.4589 11.7247 16.7853 13.29 15.5857 14.4446C14.386 15.5993 12.7583 16.2489 11.0605 16.2507H8.58365V20.0923H3.89795V3.9375H11.0605C12.0375 3.93789 13.0013 4.15346 13.8781 4.56767C14.7548 4.98186 15.5211 5.58366 16.1182 6.32685C16.9877 7.40777 17.459 8.73559 17.4583 10.1019V10.093Z" fill="#2C1DFF"/>
    <path d="M27.7319 19.9327H30.6945V14.2169H32.9221C36.3302 14.2169 38.7582 12.809 38.7582 9.63592V9.55186C38.7582 6.39979 36.4193 4.90781 32.8552 4.90781H27.7319V19.9327ZM30.6945 12.1996V7.07223H32.8552C34.7486 7.07223 35.8624 7.76569 35.8624 9.55186V9.63592C35.8624 11.296 34.8155 12.1996 32.8552 12.1996H30.6945Z" fill="white"/>
    <path d="M45.5238 18.1675C43.4745 18.1675 42.2939 16.7596 42.2939 14.5111V14.343C42.2939 12.0735 43.519 10.7076 45.5238 10.7076C47.5286 10.7076 48.7314 12.0945 48.7314 14.364V14.5111C48.7314 16.7596 47.5286 18.1675 45.5238 18.1675ZM45.5015 20.1428C48.9319 20.1428 51.4936 17.9154 51.4936 14.4901V14.322C51.4936 10.9598 48.9319 8.71131 45.5238 8.71131C42.0934 8.71131 39.5317 10.9808 39.5317 14.385V14.5532C39.5317 17.8944 42.0711 20.1428 45.5015 20.1428Z" fill="white"/>
    <path d="M58.6958 18.1675C56.6465 18.1675 55.4659 16.7596 55.4659 14.5111V14.343C55.4659 12.0735 56.691 10.7076 58.6958 10.7076C60.7006 10.7076 61.9034 12.0945 61.9034 14.364V14.5111C61.9034 16.7596 60.7006 18.1675 58.6958 18.1675ZM58.6735 20.1428C62.1039 20.1428 64.6656 17.9154 64.6656 14.4901V14.322C64.6656 10.9598 62.1039 8.71131 58.6958 8.71131C55.2654 8.71131 52.7037 10.9808 52.7037 14.385V14.5532C52.7037 17.8944 55.2431 20.1428 58.6735 20.1428Z" fill="white"/>
    <path d="M66.7222 19.9327H69.4175V3.85712H66.7222V19.9327Z" fill="white"/>
    <path d="M77.3806 20.1428C80.3655 20.1428 82.348 18.882 82.7266 16.5705H80.1204C79.9199 17.6422 79.0735 18.2516 77.4474 18.2516C75.4426 18.2516 74.3289 17.0748 74.2398 14.9944H82.7712V14.259C82.7712 10.3294 80.165 8.71131 77.2692 8.71131C73.9502 8.71131 71.4776 10.9808 71.4776 14.385V14.5532C71.4776 18.0204 73.9502 20.1428 77.3806 20.1428ZM74.2843 13.2923C74.5516 11.5902 75.6431 10.5605 77.2692 10.5605C78.9398 10.5605 79.9645 11.4011 80.0982 13.2923H74.2843Z" fill="white"/>
    <path d="M84.7332 19.9327H87.4285V14.2169C87.4285 11.8844 88.8541 11.1699 91.2153 11.1489V8.77435C89.255 8.79537 88.1635 9.6149 87.4285 11.0018V8.94246H84.7332V19.9327Z" fill="white"/>
    </svg>
    </span></div>`;
    secureTextContainer.innerHTML = htmlContent;
    modalContent.appendChild(secureTextContainer);

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    sessionmodal.appendChild(modalContent);
    // document.body.appendChild(sessionmodal);

    sessionIframe.addEventListener("load", () => {
      var iframeWindow = sessionIframe.contentWindow;
      iframeWindow.document.body.appendChild(sessionmodal);
    });

    document.body.appendChild(sessionIframe);

    // CHECK FOR SESSION RE-RENDERS, KEEP 1 AND REMOVE THE REST
    var sessionRemove = "session-iframe";
    var sessionWithId = document.querySelectorAll(
      '[id="' + sessionRemove + '"]'
    );
    if (sessionWithId.length > 1) {
      // Keep the first element and remove the rest
      for (var i = 1; i < sessionWithId.length; i++) {
        sessionWithId[i].parentNode.removeChild(sessionWithId[i]);
      }
    }

    closeBtn.addEventListener("click", function () {
      sessionIframe.parentNode.removeChild(sessionIframe);
      sessionmodal.style.display = "none";
      overlay.style.display = "none";
      var childNodes = document.body.childNodes;
      var desiredChild = null;
      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i].id === "session-iframe") {
          desiredChild = childNodes[i];
          break;
        }
      }
      if (desiredChild) {
        var parent = desiredChild.parentNode;
        parent.removeChild(desiredChild);
      }
    });

    var idToRemove = "merchant-iframe";
    var elementsWithId = document.querySelectorAll('[id="' + idToRemove + '"]');
    if (elementsWithId.length > 0) {
      // Keep the first element and remove the rest
      for (var i = 0; i < elementsWithId.length; i++) {
        elementsWithId[i].parentNode.removeChild(elementsWithId[i]);
      }
    }

    var poolerToRemove = "pooler-iframe";
    var poolerWithId = document.querySelectorAll(
      '[id="' + poolerToRemove + '"]'
    );
    if (poolerWithId.length > 0) {
      // Keep the first element and remove the rest
      for (var i = 0; i < poolerWithId.length; i++) {
        poolerWithId[i].parentNode.removeChild(poolerWithId[i]);
      }
    }
  }

  // ON FAILURE CALLBACK
  function onFailure(data) {
    // spins up failure expiration iframe
    var failureIFrame = document.createElement("iframe");
    failureIFrame.id = "failure-iframe";
    failureIFrame.style.position = "fixed";
    failureIFrame.style.top = "0";
    failureIFrame.style.left = "0";
    failureIFrame.style.width = "100%";
    failureIFrame.style.height = "100%";
    failureIFrame.style.border = "none";
    failureIFrame.style.display = "flex";

    var failureModal = document.createElement("div");
    failureModal.setAttribute("id", "failure-modal");
    // modal.className = "modal";
    failureModal.style.display = "block";
    failureModal.style.position = "fixed";
    failureModal.style.zIndex = "9999";
    failureModal.style.top = "0";
    failureModal.style.left = "0";
    failureModal.style.paddingTop = "63px";
    failureModal.style.width = "100%";
    failureModal.style.height = "100%";
    failureModal.style.overflow = "auto";
    failureModal.style.backgroundColor = "rgb(0, 0, 0, 0.3)";

    var modalContent = document.createElement("div");
    // modalContent.className = "modal-content";
    modalContent.style.backgroundColor = "#fefefe";
    modalContent.style.margin = "auto";
    modalContent.style.width = "100%";
    modalContent.style.borderRadius = "8px";
    modalContent.style.position = "relative";
    modalContent.style.maxWidth = "450px";
    modalContent.style.boxShadow = "0 4px 15px 0 rgba(0,0,0,.2)";

    var closeBtn = document.createElement("div");
    closeBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17 7L7 17M7 7L17 17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

    // closeBtn.className = "close close-img";
    closeBtn.style.color = "#000";
    closeBtn.style.float = "right";
    closeBtn.style.marginTop = "0px";
    closeBtn.style.position = "absolute";
    closeBtn.style.right = "-2%";
    closeBtn.style.top = "-2%";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.backgroundColor = "#FAFAFD";
    closeBtn.style.padding = "2px 3px";
    closeBtn.style.borderRadius = "100%";

    // modal text parent
    var modalTextParent = document.createElement("div");
    // modalTextParent.className = "modal-text-parent";
    modalTextParent.style.background = "#F5F6FB";
    modalTextParent.style.borderTopLeftRadius = "8px";
    modalTextParent.style.borderTopRightRadius = "8px";
    modalTextParent.style.borderBottom = "1px solid #e0e4f4";
    modalTextParent.style.padding = "20px";
    modalContent.appendChild(modalTextParent);

    // modal header
    var modalText = document.createElement("div");
    modalText.style.display = "flex";
    modalText.style.flexDirection = "row";
    modalText.style.alignItems = "center";
    modalText.style.justifyContent = "space-between";

    // pooler image icon
    var poolerIcon = document.createElement("div");
    // poolerIcon.innerHTML = poolerLogo;
    poolerIcon.innerHTML = `<svg width="122" height="32" viewBox="0 0 122 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M24.383 12.1136L22.9586 10.5829C22.6293 10.4051 22.2876 10.2508 21.936 10.121C20.985 9.75941 19.9744 9.57471 18.9553 9.57618H9.65918L11.1286 26.7961H15.7526V25.9878H18.9553C20.0471 25.9878 21.1283 25.7753 22.137 25.3628C23.1457 24.9502 24.0622 24.3454 24.8341 23.5829C25.606 22.8205 26.2182 21.9154 26.6358 20.9193C27.0535 19.9232 27.2682 18.8556 27.2677 17.7776V17.742C27.251 16.0846 26.6098 14.4928 25.4684 13.2772L24.383 12.1136Z" fill="#52A1FF"/>
  <path d="M25.166 15.594C25.1664 16.6723 24.9516 17.7401 24.5338 18.7364C24.116 19.7327 23.5035 20.638 22.7313 21.4004C21.9591 22.1629 21.0422 22.7676 20.0332 23.1801C19.0241 23.5926 17.9426 23.8047 16.8505 23.8043H13.6508V26.7888H7.56641V7.38673H16.8625C18.3194 7.38485 19.7511 7.76275 21.0127 8.4822L22.9649 10.5785L23.3098 10.9515C24.4908 12.2029 25.1551 13.8452 25.172 15.5555L25.166 15.594Z" fill="#1F7AFF"/>
  <path d="M22.6592 13.4573C22.6599 15.633 21.7858 17.72 20.2287 19.2595C18.6717 20.7991 16.5592 21.6652 14.3556 21.6676H11.141V26.7897H5.05957V5.25H14.3556C15.6236 5.25052 16.8746 5.53795 18.0125 6.09023C19.1504 6.64248 20.145 7.44487 20.9199 8.4358C22.0484 9.87702 22.6601 11.6474 22.6592 13.4691V13.4573Z" fill="#2C1DFF"/>
  <path d="M35.9932 26.5767H39.8383V18.9557H42.7293C47.1526 18.9557 50.3038 17.0784 50.3038 12.8476V12.7356C50.3038 8.53281 47.2682 6.5435 42.6426 6.5435H35.9932V26.5767ZM39.8383 16.2659V9.4294H42.6426C45.1 9.4294 46.5455 10.354 46.5455 12.7356V12.8476C46.5455 15.0611 45.1867 16.2659 42.6426 16.2659H39.8383Z" fill="black"/>
  <path d="M59.0847 24.2231C56.425 24.2231 54.8927 22.3459 54.8927 19.3479V19.1238C54.8927 16.0978 56.4828 14.2766 59.0847 14.2766C61.6867 14.2766 63.2478 16.1258 63.2478 19.1518V19.3479C63.2478 22.3459 61.6867 24.2231 59.0847 24.2231ZM59.0558 26.8569C63.508 26.8569 66.8327 23.8869 66.8327 19.3199V19.0958C66.8327 14.6128 63.508 11.6148 59.0847 11.6148C54.6325 11.6148 51.3078 14.6408 51.3078 19.1798V19.404C51.3078 23.8589 54.6036 26.8569 59.0558 26.8569Z" fill="black"/>
  <path d="M76.1803 24.2231C73.5205 24.2231 71.9883 22.3459 71.9883 19.3479V19.1238C71.9883 16.0978 73.5783 14.2766 76.1803 14.2766C78.7822 14.2766 80.3434 16.1258 80.3434 19.1518V19.3479C80.3434 22.3459 78.7822 24.2231 76.1803 24.2231ZM76.1514 26.8569C80.6036 26.8569 83.9283 23.8869 83.9283 19.3199V19.0958C83.9283 14.6128 80.6036 11.6148 76.1803 11.6148C71.7281 11.6148 68.4034 14.6408 68.4034 19.1798V19.404C68.4034 23.8589 71.6992 26.8569 76.1514 26.8569Z" fill="black"/>
  <path d="M86.5975 26.5767H90.0957V5.14258H86.5975V26.5767Z" fill="black"/>
  <path d="M100.431 26.8569C104.305 26.8569 106.878 25.1758 107.369 22.0937H103.987C103.727 23.5227 102.628 24.3352 100.517 24.3352C97.9155 24.3352 96.47 22.7662 96.3544 19.9923H107.427V19.0117C107.427 13.7723 104.045 11.6148 100.286 11.6148C95.9785 11.6148 92.7695 14.6408 92.7695 19.1798V19.404C92.7695 24.027 95.9785 26.8569 100.431 26.8569ZM96.4122 17.7229C96.7591 15.4534 98.1757 14.0805 100.286 14.0805C102.454 14.0805 103.784 15.2012 103.958 17.7229H96.4122Z" fill="black"/>
  <path d="M109.973 26.5767H113.472V18.9557C113.472 15.8456 115.322 14.893 118.386 14.865V11.6989C115.842 11.7269 114.426 12.8196 113.472 14.6688V11.923H109.973V26.5767Z" fill="black"/>
  </svg>
  `;
    poolerIcon.style.width = "32px";
    poolerIcon.style.height = "32px";
    modalText.appendChild(poolerIcon);

    // amount and email address column
    var modalAmountEmail = document.createElement("div");
    // modalAmountEmail.className = "modal-amt-email";
    modalAmountEmail.style.display = "flex";
    modalAmountEmail.style.flexDirection = "column";
    modalAmountEmail.style.marginTop = "0.25rem";
    modalText.appendChild(modalAmountEmail);
    modalTextParent.appendChild(modalText);

    // amount
    var modalAmount = document.createElement("div");
    // modalAmount.className = "modal-amount modal-amt";
    modalAmount.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    modalAmount.style.fontWeight = "600";
    modalAmount.style.color = "#000";
    modalAmount.style.textAlign = "end";
    modalAmount.style.textAlign = "right";
    modalAmount.style.fontSize = "1.125rem";
    modalAmount.style.paddingBottom = "8px";
    modalAmount.textContent = `${data?.currency_code}${data?.amount}`;
    modalAmountEmail.appendChild(modalAmount);

    // email
    var modalEmail = document.createElement("div");
    // modalEmail.className = "modal-email modal-em";
    modalEmail.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    modalEmail.style.color = "#8f9bb2";
    modalEmail.style.fontStyle = "normal";
    modalEmail.style.fontSize = "1rem";
    modalEmail.textContent = `${data?.email}`;
    modalAmountEmail.appendChild(modalEmail);

    // modal body
    var modalBody = document.createElement("div");
    // modalBody.className = "modal-body";
    modalBody.style.display = "flex";
    modalBody.style.flexDirection = "column";
    modalBody.style.position = "relative";
    modalBody.style.justifyContent = "center";
    modalBody.style.paddingTop = "25px";

    // merchant details
    var paymentDetails = document.createElement("ul");
    // paymentDetails.className = "payment-details";
    paymentDetails.style.listStyleType = "none";
    paymentDetails.style.display = "flex";
    paymentDetails.style.flexDirection = "column";
    paymentDetails.style.width = "79%";
    paymentDetails.style.marginBottom = "30px";
    paymentDetails.style.position = "relative";
    paymentDetails.style.marginTop = "30px";

    // SUCCESS CONTAINER
    var successContainer = document.createElement("div");
    successContainer.style.background = "#FFE5EC";
    // successContainer.className = "awaiting-container";
    successContainer.style.alignItems = "center";
    successContainer.style.display = "flex";
    successContainer.style.flexDirection = "column";
    successContainer.style.borderRadius = "0.5rem";
    successContainer.style.margin = "auto";
    successContainer.style.width = "90%";
    successContainer.style.paddingTop = "1.5rem";
    successContainer.style.paddingBottom = "1.5rem";
    successContainer.style.marginTop = "25px";
    successContainer.style.marginBottom = "35px";
    successContainer.style.justifyContent = "center";
    successContainer.style.marginTop = "30px";
    successContainer.style.margin = "auto";
    modalBody.appendChild(successContainer);

    // loader
    var successIcon = document.createElement("div");
    successIcon = `<svg width="93" height="67" viewBox="0 0 93 67" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: auto; text-align: center; ">
  <g filter="url(#filter0_d_467_8419)">
  <rect width="91" height="65" rx="4" fill="white"/>
  </g>
  <rect x="5" y="5" width="81" height="55" rx="2" fill="#FFE5EC"/>
  <path d="M5 7C5 5.89543 5.89543 5 7 5H63V44C63 45.1046 62.1046 46 61 46H5V7Z" fill="#FFCCD8"/>
  <path d="M5 7C5 5.89543 5.89543 5 7 5H39V28C39 29.1046 38.1046 30 37 30H5V7Z" fill="#FF99B1"/>
  <circle cx="66.5" cy="40.5" r="14.5" fill="#FF003D"/>
  <path d="M67 33L67 42" stroke="white" stroke-width="4" stroke-linecap="round"/>
  <path d="M67 48L67 49" stroke="white" stroke-width="4" stroke-linecap="round"/>
  <defs>
  <filter id="filter0_d_467_8419" x="0" y="0" width="93" height="67" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset dx="2" dy="2"/>
  <feComposite in2="hardAlpha" operator="out"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_467_8419"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_467_8419" result="shape"/>
  </filter>
  </defs>
  </svg>`;
    successContainer.innerHTML = successIcon;

    var awaitingConfirmation = document.createElement("div");
    awaitingConfirmation.textContent = "Transaction Failed!";
    awaitingConfirmation.style.fontFamily = "GraphikMedium, sans-serif";
    awaitingConfirmation.style.paddingTop = "5px";
    awaitingConfirmation.style.fontFamily = "GraphikRegular, sans-serif";
    awaitingConfirmation.style.textAlign = "center";
    awaitingConfirmation.style.fontSize = "16px";
    awaitingConfirmation.style.paddingTop = "20px";
    awaitingConfirmation.style.color = "#FF003D";
    awaitingConfirmation.style.fontWeight = "500";
    awaitingConfirmation.className = "transferToMerchant modal-amount";
    successContainer.appendChild(awaitingConfirmation);

    var successMessage = document.createElement("div");
    successMessage.className = "awaiting-message modal-email";
    successMessage.style.fontFamily = "GraphikRegular, sans-serif";
    successMessage.style.margin = "auto";
    successMessage.style.width = "80%";
    successMessage.style.fontSize = "14px";
    successMessage.style.textAlign = "center";
    successMessage.style.paddingTop = "20px";
    successMessage.style.color = "#000";
    successMessage.textContent = "Something went wrong. Please, try again!";
    successContainer.appendChild(successMessage);

    // LIST 1
    var li1 = document.createElement("li");
    // li1.className = "payment-detail";
    li1.style.display = "flex";
    li1.style.flexDirection = "column";
    li1.style.alignItems = "left";
    li1.style.justifyContent = "space-between";
    li1.style.borderBottom = "1px solid #e5e7eb";
    li1.style.paddingTop = "0.9em";
    li1.style.paddingBottom = "0.9em";
    var merchant = document.createElement("span");
    // merchant.className = "payment-detail-text modal-email";
    merchant.textContent = "Merchant";
    var merchatName = document.createElement("span");
    // merchatName.className = "payment-detail-bold text-truncate";
    merchatName.style.fontFamily = "GraphikMedium, sans-serif";
    merchatName.style.fontWeight = "500";
    merchatName.style.color = "#000";
    merchant.style.fontFamily = "GraphikRegular, sans-serif";
    merchant.style.color = "#8f9bb2";
    merchatName.style.fontWeight = "500";
    merchatName.style.color = "#000";
    merchatName.style.marginTop = "5px";
    merchatName.textContent = `${data.display_name}`;
    li1.appendChild(merchant);
    li1.appendChild(merchatName);

    // LIST 2
    var li2 = document.createElement("li");
    // li2.className = "payment-detail";
    li2.style.display = "flex";
    li2.style.flexDirection = "column";
    li2.style.alignItems = "left";
    li2.style.justifyContent = "space-between";
    li2.style.borderBottom = "1px solid #e5e7eb";
    li2.style.paddingTop = "0.9em";
    li2.style.paddingBottom = "0.9em";
    var accNum = document.createElement("span");
    // accNum.className = "payment-detail-text modal-email";
    accNum.textContent = "Account Number";
    accNum.style.fontFamily = "GraphikRegular, sans-serif";
    accNum.style.color = "#8f9bb2";
    var accDetails = document.createElement("span");
    accDetails.className = "payment-detail-bold row-span";
    accDetails.textContent = `${data?.account_no}`;
    accDetails.style.fontFamily = "GraphikMedium, sans-serif";
    accDetails.style.fontWeight = "500";
    accDetails.style.color = "#000";
    accDetails.style.display = "flex";
    accDetails.style.flexDirection = "row";
    accDetails.style.marginTop = "5px";
    var copy = document.createElement("div");
    copy.className = "copy";
    // copy.innerHTML = copyIcon;
    copy.innerHTML = `<svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 14C3.06812 14 2.60218 14 2.23463 13.8478C1.74458 13.6448 1.35523 13.2554 1.15224 12.7654C1 12.3978 1 11.9319 1 11V4.2C1 3.0799 1 2.51984 1.21799 2.09202C1.40973 1.71569 1.71569 1.40973 2.09202 1.21799C2.51984 1 3.0799 1 4.2 1H11C11.9319 1 12.3978 1 12.7654 1.15224C13.2554 1.35523 13.6448 1.74458 13.8478 2.23463C14 2.60218 14 3.06812 14 4M11.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V11.2C21 10.0799 21 9.51984 20.782 9.09202C20.5903 8.7157 20.2843 8.40973 19.908 8.21799C19.4802 8 18.9201 8 17.8 8H11.2C10.0799 8 9.51984 8 9.09202 8.21799C8.7157 8.40973 8.40973 8.7157 8.21799 9.09202C8 9.51984 8 10.0799 8 11.2V17.8C8 18.9201 8 19.4802 8.21799 19.908C8.40973 20.2843 8.7157 20.5903 9.09202 20.782C9.51984 21 10.0799 21 11.2 21Z" stroke="#CBD1EC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
    copy.style.width = "20px";
    copy.style.height = "20px";
    copy.style.position = "absolute";
    copy.style.left = "102%";
    copy.style.cursor = "pointer";
    copy.addEventListener("click", function () {
      navigator.clipboard.writeText(`${data?.account_no}`);
    });
    accDetails.appendChild(copy);
    li2.appendChild(accNum);
    li2.appendChild(accDetails);

    // LIST 3
    var li3 = document.createElement("li");
    // li3.className = "payment-detail";
    li3.style.borderBottom = "0px";
    li3.style.display = "flex";
    li3.style.flexDirection = "column";
    li3.style.alignItems = "left";
    li3.style.justifyContent = "space-between";
    li3.style.borderBottom = "1px solid #e5e7eb";
    li3.style.paddingTop = "0.9em";
    li3.style.paddingBottom = "0.9em";
    var bank = document.createElement("span");
    // bank.className = "payment-detail-text modal-email";
    bank.textContent = "Bank name";
    bank.style.fontFamily = "GraphikRegular, sans-serif";
    bank.style.color = "#8f9bb2";
    var bankDetails = document.createElement("span");
    // bankDetails.className = "payment-detail-bold text-truncate";
    bankDetails.textContent = `${data?.bank_name}`;
    bankDetails.style.width = "125px";
    bankDetails.style.whiteSpace = "nowrap";
    bankDetails.style.overflow = "hidden";
    bankDetails.style.textOverflow = "ellipsis";
    bankDetails.style.fontFamily = "GraphikMedium, sans-serif";
    bankDetails.style.fontWeight = "500";
    bankDetails.style.textAlign = "left";
    bankDetails.style.color = "#000";
    bankDetails.style.marginTop = "5px";
    li3.appendChild(bank);
    li3.appendChild(bankDetails);

    // UL MAKE UP
    paymentDetails.appendChild(li1);
    paymentDetails.appendChild(li2);
    paymentDetails.appendChild(li3);
    modalBody.appendChild(paymentDetails);

    // button and countdwon timer
    var modalFooter = document.createElement("div");
    // modalFooter.className = "modal-footer";
    modalFooter.style.display = "flex";
    modalFooter.style.flexDirection = "column";
    modalFooter.style.width = "100%";
    modalFooter.style.paddingTop = "0.5rem";
    modalFooter.style.paddingBottom = "1.5rem";
    var paybutton = document.createElement("button");
    // paybutton.className = "modal-req-acc-btn";
    paybutton.style.border = "1px solid #d0d5e9";
    paybutton.style.filter = "drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.05))";
    paybutton.style.borderRadius = "8px";
    paybutton.style.textAlign = "center";
    paybutton.style.width = "80%";
    paybutton.style.color = "#000";
    paybutton.style.fontWeight = "500";
    paybutton.style.fontSize = "1.125rem";
    paybutton.style.height = "2.75rem";
    paybutton.style.margin = "auto";
    paybutton.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    paybutton.textContent = "Request for new account";

    modalFooter.appendChild(paybutton);

    // secure by pooler
    var secureTextContainer = document.createElement("div");
    // secureTextContainer.className = "absolute footer-text";
    secureTextContainer.style.position = "absolute";
    secureTextContainer.style.top = "103%";
    secureTextContainer.style.left = "27%";
    secureTextContainer.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    var htmlContent = document.createElement("div");
    htmlContent.style.display = "flex";
    htmlContent.style.flexDirection = "row";
    htmlContent.style.paddingTop = "8px";
    htmlContent.style.color = "white";
    htmlContent.style.alignItems = "center";
    var htmlContent = `<div style="color: #fff; display: flex; align-items: center; gap: "20px"; flex: row; align-items: center;"><p>Secured by</p><span><svg width="94" height="24" viewBox="0 0 94 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.787 9.08492L17.6895 7.9369C17.4357 7.8036 17.1724 7.68782 16.9016 7.59047C16.1688 7.31931 15.3902 7.18079 14.6049 7.18189H7.44238L8.57455 20.0968H12.1373V19.4906H14.6049C15.4462 19.4906 16.2792 19.3312 17.0565 19.0219C17.8337 18.7124 18.5398 18.2588 19.1346 17.6869C19.7293 17.1151 20.201 16.4363 20.5228 15.6892C20.8446 14.9421 21.01 14.1415 21.0096 13.3329V13.3063C20.9968 12.0632 20.5027 10.8693 19.6233 9.95762L18.787 9.08492Z" fill="#52A1FF"/>
  <path d="M19.3899 11.696C19.3902 12.5047 19.2247 13.3056 18.9028 14.0528C18.581 14.8 18.109 15.479 17.514 16.0508C16.919 16.6227 16.2126 17.0762 15.4351 17.3856C14.6576 17.6949 13.8244 17.854 12.9829 17.8537H10.5176V20.0921H5.82959V5.54053H12.9921C14.1147 5.53913 15.2178 5.82255 16.1899 6.36214L17.694 7.93433L17.9597 8.21411C18.8697 9.15265 19.3815 10.3844 19.3945 11.6671L19.3899 11.696Z" fill="#1F7AFF"/>
  <path d="M17.4583 10.093C17.4589 11.7247 16.7853 13.29 15.5857 14.4446C14.386 15.5993 12.7583 16.2489 11.0605 16.2507H8.58365V20.0923H3.89795V3.9375H11.0605C12.0375 3.93789 13.0013 4.15346 13.8781 4.56767C14.7548 4.98186 15.5211 5.58366 16.1182 6.32685C16.9877 7.40777 17.459 8.73559 17.4583 10.1019V10.093Z" fill="#2C1DFF"/>
  <path d="M27.7319 19.9327H30.6945V14.2169H32.9221C36.3302 14.2169 38.7582 12.809 38.7582 9.63592V9.55186C38.7582 6.39979 36.4193 4.90781 32.8552 4.90781H27.7319V19.9327ZM30.6945 12.1996V7.07223H32.8552C34.7486 7.07223 35.8624 7.76569 35.8624 9.55186V9.63592C35.8624 11.296 34.8155 12.1996 32.8552 12.1996H30.6945Z" fill="white"/>
  <path d="M45.5238 18.1675C43.4745 18.1675 42.2939 16.7596 42.2939 14.5111V14.343C42.2939 12.0735 43.519 10.7076 45.5238 10.7076C47.5286 10.7076 48.7314 12.0945 48.7314 14.364V14.5111C48.7314 16.7596 47.5286 18.1675 45.5238 18.1675ZM45.5015 20.1428C48.9319 20.1428 51.4936 17.9154 51.4936 14.4901V14.322C51.4936 10.9598 48.9319 8.71131 45.5238 8.71131C42.0934 8.71131 39.5317 10.9808 39.5317 14.385V14.5532C39.5317 17.8944 42.0711 20.1428 45.5015 20.1428Z" fill="white"/>
  <path d="M58.6958 18.1675C56.6465 18.1675 55.4659 16.7596 55.4659 14.5111V14.343C55.4659 12.0735 56.691 10.7076 58.6958 10.7076C60.7006 10.7076 61.9034 12.0945 61.9034 14.364V14.5111C61.9034 16.7596 60.7006 18.1675 58.6958 18.1675ZM58.6735 20.1428C62.1039 20.1428 64.6656 17.9154 64.6656 14.4901V14.322C64.6656 10.9598 62.1039 8.71131 58.6958 8.71131C55.2654 8.71131 52.7037 10.9808 52.7037 14.385V14.5532C52.7037 17.8944 55.2431 20.1428 58.6735 20.1428Z" fill="white"/>
  <path d="M66.7222 19.9327H69.4175V3.85712H66.7222V19.9327Z" fill="white"/>
  <path d="M77.3806 20.1428C80.3655 20.1428 82.348 18.882 82.7266 16.5705H80.1204C79.9199 17.6422 79.0735 18.2516 77.4474 18.2516C75.4426 18.2516 74.3289 17.0748 74.2398 14.9944H82.7712V14.259C82.7712 10.3294 80.165 8.71131 77.2692 8.71131C73.9502 8.71131 71.4776 10.9808 71.4776 14.385V14.5532C71.4776 18.0204 73.9502 20.1428 77.3806 20.1428ZM74.2843 13.2923C74.5516 11.5902 75.6431 10.5605 77.2692 10.5605C78.9398 10.5605 79.9645 11.4011 80.0982 13.2923H74.2843Z" fill="white"/>
  <path d="M84.7332 19.9327H87.4285V14.2169C87.4285 11.8844 88.8541 11.1699 91.2153 11.1489V8.77435C89.255 8.79537 88.1635 9.6149 87.4285 11.0018V8.94246H84.7332V19.9327Z" fill="white"/>
  </svg>
  </span></div>`;
    secureTextContainer.innerHTML = htmlContent;
    modalContent.appendChild(secureTextContainer);

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    failureModal.appendChild(modalContent);
    // document.body.appendChild(failureModal);

    failureIFrame.addEventListener("load", () => {
      var iframeWindow = failureIFrame.contentWindow;
      iframeWindow.document.body.appendChild(failureModal);
    });

    document.body.appendChild(failureIFrame);

    // CHECK TO SEE MULTIPLE FAILURE IFRAMES EXIST, KEEP 1 AND REMOVE THE REST
    var idToRemove = "failure-iframe";
    var elementsWithId = document.querySelectorAll('[id="' + idToRemove + '"]');

    if (elementsWithId.length > 1) {
      // Keep the first element and remove the rest
      for (var i = 1; i < elementsWithId.length; i++) {
        elementsWithId[i].parentNode.removeChild(elementsWithId[i]);
      }
    }

    var iframeRemove = "pooler-iframe";
    var elementsWithIframe = document.querySelectorAll(
      '[id="' + iframeRemove + '"]'
    );
    if (elementsWithIframe.length > 0) {
      // Keep the first element and remove the rest
      for (var i = 0; i < elementsWithIframe.length; i++) {
        elementsWithIframe[i].parentNode.removeChild(elementsWithIframe[i]);
      }
    }

    var merchantRemove = "merchant-iframe";
    var merchantWithIframe = document.querySelectorAll(
      '[id="' + merchantRemove + '"]'
    );
    if (merchantWithIframe.length > 0) {
      // Keep the first element and remove the rest
      for (var i = 0; i < merchantWithIframe.length; i++) {
        merchantWithIframe[i].parentNode.removeChild(merchantWithIframe[i]);
      }
    }

    closeBtn.addEventListener("click", function () {
      failureIFrame.parentNode.removeChild(failureIFrame);
      failureModal.style.display = "none";
      overlay.style.display = "none";
      var childNodes = document.body.childNodes;
      var desiredChild = null;
      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i].id === "failure-iframe") {
          desiredChild = childNodes[i];
          break;
        }
      }
      if (desiredChild) {
        var parent = desiredChild.parentNode;
        parent.removeChild(desiredChild);
      }
    });
  }

  // ON SUCCESS CALLBACK
  function onSuccess(data) {}

  // ON COMPLETE CALLBACK
  function onComplete(data) {}

  // ON ERROR
  function onError(data) {
    // spins up failure expiration iframe
    var failureIFrame = document.createElement("iframe");
    failureIFrame.id = "error-iframe";
    failureIFrame.style.position = "fixed";
    failureIFrame.style.top = "0";
    failureIFrame.style.left = "0";
    failureIFrame.style.width = "100%";
    failureIFrame.style.height = "100%";
    failureIFrame.style.border = "none";
    failureIFrame.style.display = "flex";

    var failureModal = document.createElement("div");
    failureModal.setAttribute("id", "error-modal");
    // modal.className = "modal";
    failureModal.style.display = "block";
    failureModal.style.position = "fixed";
    failureModal.style.zIndex = "9999";
    failureModal.style.top = "0";
    failureModal.style.left = "0";
    failureModal.style.paddingTop = "63px";
    failureModal.style.width = "100%";
    failureModal.style.height = "100%";
    failureModal.style.overflow = "auto";
    failureModal.style.backgroundColor = "rgb(0, 0, 0, 0.3)";

    var modalContent = document.createElement("div");
    // modalContent.className = "modal-content";
    modalContent.style.backgroundColor = "#fefefe";
    modalContent.style.margin = "auto";
    modalContent.style.width = "100%";
    modalContent.style.borderRadius = "8px";
    modalContent.style.position = "relative";
    modalContent.style.maxWidth = "450px";
    modalContent.style.boxShadow = "0 4px 15px 0 rgba(0,0,0,.2)";

    var closeBtn = document.createElement("div");
    closeBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17 7L7 17M7 7L17 17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

    // closeBtn.className = "close close-img";
    closeBtn.style.color = "#000";
    closeBtn.style.float = "right";
    closeBtn.style.marginTop = "0px";
    closeBtn.style.position = "absolute";
    closeBtn.style.right = "-2%";
    closeBtn.style.top = "-2%";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.backgroundColor = "#FAFAFD";
    closeBtn.style.padding = "2px 3px";
    closeBtn.style.borderRadius = "100%";

    // modal text parent
    var modalTextParent = document.createElement("div");
    // modalTextParent.className = "modal-text-parent";
    modalTextParent.style.background = "#F5F6FB";
    modalTextParent.style.borderTopLeftRadius = "8px";
    modalTextParent.style.borderTopRightRadius = "8px";
    modalTextParent.style.borderBottom = "1px solid #e0e4f4";
    modalTextParent.style.padding = "20px";
    modalContent.appendChild(modalTextParent);

    // modal header
    var modalText = document.createElement("div");
    modalText.style.display = "flex";
    modalText.style.flexDirection = "row";
    modalText.style.alignItems = "center";
    modalText.style.justifyContent = "space-between";

    // pooler image icon
    var poolerIcon = document.createElement("div");
    // poolerIcon.innerHTML = poolerLogo;
    poolerIcon.innerHTML = `<svg width="122" height="32" viewBox="0 0 122 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M24.383 12.1136L22.9586 10.5829C22.6293 10.4051 22.2876 10.2508 21.936 10.121C20.985 9.75941 19.9744 9.57471 18.9553 9.57618H9.65918L11.1286 26.7961H15.7526V25.9878H18.9553C20.0471 25.9878 21.1283 25.7753 22.137 25.3628C23.1457 24.9502 24.0622 24.3454 24.8341 23.5829C25.606 22.8205 26.2182 21.9154 26.6358 20.9193C27.0535 19.9232 27.2682 18.8556 27.2677 17.7776V17.742C27.251 16.0846 26.6098 14.4928 25.4684 13.2772L24.383 12.1136Z" fill="#52A1FF"/>
  <path d="M25.166 15.594C25.1664 16.6723 24.9516 17.7401 24.5338 18.7364C24.116 19.7327 23.5035 20.638 22.7313 21.4004C21.9591 22.1629 21.0422 22.7676 20.0332 23.1801C19.0241 23.5926 17.9426 23.8047 16.8505 23.8043H13.6508V26.7888H7.56641V7.38673H16.8625C18.3194 7.38485 19.7511 7.76275 21.0127 8.4822L22.9649 10.5785L23.3098 10.9515C24.4908 12.2029 25.1551 13.8452 25.172 15.5555L25.166 15.594Z" fill="#1F7AFF"/>
  <path d="M22.6592 13.4573C22.6599 15.633 21.7858 17.72 20.2287 19.2595C18.6717 20.7991 16.5592 21.6652 14.3556 21.6676H11.141V26.7897H5.05957V5.25H14.3556C15.6236 5.25052 16.8746 5.53795 18.0125 6.09023C19.1504 6.64248 20.145 7.44487 20.9199 8.4358C22.0484 9.87702 22.6601 11.6474 22.6592 13.4691V13.4573Z" fill="#2C1DFF"/>
  <path d="M35.9932 26.5767H39.8383V18.9557H42.7293C47.1526 18.9557 50.3038 17.0784 50.3038 12.8476V12.7356C50.3038 8.53281 47.2682 6.5435 42.6426 6.5435H35.9932V26.5767ZM39.8383 16.2659V9.4294H42.6426C45.1 9.4294 46.5455 10.354 46.5455 12.7356V12.8476C46.5455 15.0611 45.1867 16.2659 42.6426 16.2659H39.8383Z" fill="black"/>
  <path d="M59.0847 24.2231C56.425 24.2231 54.8927 22.3459 54.8927 19.3479V19.1238C54.8927 16.0978 56.4828 14.2766 59.0847 14.2766C61.6867 14.2766 63.2478 16.1258 63.2478 19.1518V19.3479C63.2478 22.3459 61.6867 24.2231 59.0847 24.2231ZM59.0558 26.8569C63.508 26.8569 66.8327 23.8869 66.8327 19.3199V19.0958C66.8327 14.6128 63.508 11.6148 59.0847 11.6148C54.6325 11.6148 51.3078 14.6408 51.3078 19.1798V19.404C51.3078 23.8589 54.6036 26.8569 59.0558 26.8569Z" fill="black"/>
  <path d="M76.1803 24.2231C73.5205 24.2231 71.9883 22.3459 71.9883 19.3479V19.1238C71.9883 16.0978 73.5783 14.2766 76.1803 14.2766C78.7822 14.2766 80.3434 16.1258 80.3434 19.1518V19.3479C80.3434 22.3459 78.7822 24.2231 76.1803 24.2231ZM76.1514 26.8569C80.6036 26.8569 83.9283 23.8869 83.9283 19.3199V19.0958C83.9283 14.6128 80.6036 11.6148 76.1803 11.6148C71.7281 11.6148 68.4034 14.6408 68.4034 19.1798V19.404C68.4034 23.8589 71.6992 26.8569 76.1514 26.8569Z" fill="black"/>
  <path d="M86.5975 26.5767H90.0957V5.14258H86.5975V26.5767Z" fill="black"/>
  <path d="M100.431 26.8569C104.305 26.8569 106.878 25.1758 107.369 22.0937H103.987C103.727 23.5227 102.628 24.3352 100.517 24.3352C97.9155 24.3352 96.47 22.7662 96.3544 19.9923H107.427V19.0117C107.427 13.7723 104.045 11.6148 100.286 11.6148C95.9785 11.6148 92.7695 14.6408 92.7695 19.1798V19.404C92.7695 24.027 95.9785 26.8569 100.431 26.8569ZM96.4122 17.7229C96.7591 15.4534 98.1757 14.0805 100.286 14.0805C102.454 14.0805 103.784 15.2012 103.958 17.7229H96.4122Z" fill="black"/>
  <path d="M109.973 26.5767H113.472V18.9557C113.472 15.8456 115.322 14.893 118.386 14.865V11.6989C115.842 11.7269 114.426 12.8196 113.472 14.6688V11.923H109.973V26.5767Z" fill="black"/>
  </svg>
  `;
    poolerIcon.style.width = "32px";
    poolerIcon.style.height = "32px";
    modalText.appendChild(poolerIcon);

    // amount and email address column
    var modalAmountEmail = document.createElement("div");
    // modalAmountEmail.className = "modal-amt-email";
    modalAmountEmail.style.display = "flex";
    modalAmountEmail.style.flexDirection = "column";
    modalAmountEmail.style.marginTop = "0.25rem";
    modalText.appendChild(modalAmountEmail);
    modalTextParent.appendChild(modalText);

    // amount
    var modalAmount = document.createElement("div");
    // modalAmount.className = "modal-amount modal-amt";
    modalAmount.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    modalAmount.style.fontWeight = "600";
    modalAmount.style.color = "#000";
    modalAmount.style.textAlign = "end";
    modalAmount.style.textAlign = "right";
    modalAmount.style.fontSize = "1.125rem";
    modalAmount.style.paddingBottom = "8px";
    modalAmount.textContent = `NGN${data?.amount}`;
    modalAmountEmail.appendChild(modalAmount);

    // email
    var modalEmail = document.createElement("div");
    // modalEmail.className = "modal-email modal-em";
    modalEmail.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    modalEmail.style.color = "#8f9bb2";
    modalEmail.style.fontStyle = "normal";
    modalEmail.style.fontSize = "1rem";
    modalEmail.textContent = `${data?.email}`;
    modalAmountEmail.appendChild(modalEmail);

    // modal body
    var modalBody = document.createElement("div");
    // modalBody.className = "modal-body";
    modalBody.style.display = "flex";
    modalBody.style.flexDirection = "column";
    modalBody.style.position = "relative";
    modalBody.style.justifyContent = "center";
    modalBody.style.paddingTop = "25px";

    // merchant details
    var paymentDetails = document.createElement("ul");
    // paymentDetails.className = "payment-details";
    paymentDetails.style.listStyleType = "none";
    paymentDetails.style.display = "flex";
    paymentDetails.style.flexDirection = "column";
    paymentDetails.style.width = "79%";
    paymentDetails.style.marginBottom = "30px";
    paymentDetails.style.position = "relative";
    paymentDetails.style.marginTop = "30px";

    // SUCCESS CONTAINER
    var successContainer = document.createElement("div");
    successContainer.style.background = "#FFE5EC";
    // successContainer.className = "awaiting-container";
    successContainer.style.alignItems = "center";
    successContainer.style.display = "flex";
    successContainer.style.flexDirection = "column";
    successContainer.style.borderRadius = "0.5rem";
    successContainer.style.margin = "auto";
    successContainer.style.width = "90%";
    successContainer.style.paddingTop = "1.5rem";
    successContainer.style.paddingBottom = "1.5rem";
    successContainer.style.marginTop = "25px";
    successContainer.style.marginBottom = "35px";
    successContainer.style.justifyContent = "center";
    successContainer.style.marginTop = "30px";
    successContainer.style.margin = "auto";
    modalBody.appendChild(successContainer);

    // loader
    var successIcon = document.createElement("div");
    successIcon = `<svg width="93" height="67" viewBox="0 0 93 67" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: auto; text-align: center; ">
  <g filter="url(#filter0_d_467_8419)">
  <rect width="91" height="65" rx="4" fill="white"/>
  </g>
  <rect x="5" y="5" width="81" height="55" rx="2" fill="#FFE5EC"/>
  <path d="M5 7C5 5.89543 5.89543 5 7 5H63V44C63 45.1046 62.1046 46 61 46H5V7Z" fill="#FFCCD8"/>
  <path d="M5 7C5 5.89543 5.89543 5 7 5H39V28C39 29.1046 38.1046 30 37 30H5V7Z" fill="#FF99B1"/>
  <circle cx="66.5" cy="40.5" r="14.5" fill="#FF003D"/>
  <path d="M67 33L67 42" stroke="white" stroke-width="4" stroke-linecap="round"/>
  <path d="M67 48L67 49" stroke="white" stroke-width="4" stroke-linecap="round"/>
  <defs>
  <filter id="filter0_d_467_8419" x="0" y="0" width="93" height="67" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset dx="2" dy="2"/>
  <feComposite in2="hardAlpha" operator="out"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_467_8419"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_467_8419" result="shape"/>
  </filter>
  </defs>
  </svg>`;
    successContainer.innerHTML = successIcon;

    var awaitingConfirmation = document.createElement("div");
    awaitingConfirmation.textContent = "Error!";
    awaitingConfirmation.style.fontFamily = "GraphikMedium, sans-serif";
    awaitingConfirmation.style.paddingTop = "5px";
    awaitingConfirmation.style.fontFamily = "GraphikRegular, sans-serif";
    awaitingConfirmation.style.textAlign = "center";
    awaitingConfirmation.style.fontSize = "16px";
    awaitingConfirmation.style.paddingTop = "20px";
    awaitingConfirmation.style.color = "#FF003D";
    awaitingConfirmation.style.fontWeight = "500";
    awaitingConfirmation.className = "transferToMerchant modal-amount";
    successContainer.appendChild(awaitingConfirmation);

    var successMessage = document.createElement("div");
    successMessage.className = "awaiting-message modal-email";
    successMessage.style.fontFamily = "GraphikRegular, sans-serif";
    successMessage.style.margin = "auto";
    successMessage.style.width = "80%";
    successMessage.style.fontSize = "14px";
    successMessage.style.textAlign = "center";
    successMessage.style.paddingTop = "20px";
    successMessage.style.color = "#000";
    successMessage.textContent = "Something went wrong. Please, try again!";
    successContainer.appendChild(successMessage);

    // LIST 1
    var li1 = document.createElement("li");
    // li1.className = "payment-detail";
    li1.style.display = "flex";
    li1.style.flexDirection = "column";
    li1.style.alignItems = "left";
    li1.style.justifyContent = "space-between";
    li1.style.borderBottom = "1px solid #e5e7eb";
    li1.style.paddingTop = "0.9em";
    li1.style.paddingBottom = "0.9em";
    var merchant = document.createElement("span");
    // merchant.className = "payment-detail-text modal-email";
    merchant.textContent = "Merchant";
    var merchatName = document.createElement("span");
    // merchatName.className = "payment-detail-bold text-truncate";
    merchatName.style.fontFamily = "GraphikMedium, sans-serif";
    merchatName.style.fontWeight = "500";
    merchatName.style.color = "#000";
    merchant.style.fontFamily = "GraphikRegular, sans-serif";
    merchant.style.color = "#8f9bb2";
    merchatName.style.fontWeight = "500";
    merchatName.style.color = "#000";
    merchatName.style.marginTop = "5px";
    merchatName.textContent = `${data.display_name}`;
    li1.appendChild(merchant);
    li1.appendChild(merchatName);

    // LIST 2
    var li2 = document.createElement("li");
    // li2.className = "payment-detail";
    li2.style.display = "flex";
    li2.style.flexDirection = "column";
    li2.style.alignItems = "left";
    li2.style.justifyContent = "space-between";
    li2.style.borderBottom = "1px solid #e5e7eb";
    li2.style.paddingTop = "0.9em";
    li2.style.paddingBottom = "0.9em";
    var accNum = document.createElement("span");
    // accNum.className = "payment-detail-text modal-email";
    accNum.textContent = "Account Number";
    accNum.style.fontFamily = "GraphikRegular, sans-serif";
    accNum.style.color = "#8f9bb2";
    var accDetails = document.createElement("span");
    accDetails.className = "payment-detail-bold row-span";
    accDetails.textContent = `${data?.account_no}`;
    accDetails.style.fontFamily = "GraphikMedium, sans-serif";
    accDetails.style.fontWeight = "500";
    accDetails.style.color = "#000";
    accDetails.style.display = "flex";
    accDetails.style.flexDirection = "row";
    accDetails.style.marginTop = "5px";
    var copy = document.createElement("div");
    copy.className = "copy";
    // copy.innerHTML = copyIcon;
    copy.innerHTML = `<svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 14C3.06812 14 2.60218 14 2.23463 13.8478C1.74458 13.6448 1.35523 13.2554 1.15224 12.7654C1 12.3978 1 11.9319 1 11V4.2C1 3.0799 1 2.51984 1.21799 2.09202C1.40973 1.71569 1.71569 1.40973 2.09202 1.21799C2.51984 1 3.0799 1 4.2 1H11C11.9319 1 12.3978 1 12.7654 1.15224C13.2554 1.35523 13.6448 1.74458 13.8478 2.23463C14 2.60218 14 3.06812 14 4M11.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V11.2C21 10.0799 21 9.51984 20.782 9.09202C20.5903 8.7157 20.2843 8.40973 19.908 8.21799C19.4802 8 18.9201 8 17.8 8H11.2C10.0799 8 9.51984 8 9.09202 8.21799C8.7157 8.40973 8.40973 8.7157 8.21799 9.09202C8 9.51984 8 10.0799 8 11.2V17.8C8 18.9201 8 19.4802 8.21799 19.908C8.40973 20.2843 8.7157 20.5903 9.09202 20.782C9.51984 21 10.0799 21 11.2 21Z" stroke="#CBD1EC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
    copy.style.width = "20px";
    copy.style.height = "20px";
    copy.style.position = "absolute";
    copy.style.left = "102%";
    copy.style.cursor = "pointer";
    copy.addEventListener("click", function () {
      navigator.clipboard.writeText(`${data?.account_no}`);
    });
    accDetails.appendChild(copy);
    li2.appendChild(accNum);
    li2.appendChild(accDetails);

    // LIST 3
    var li3 = document.createElement("li");
    // li3.className = "payment-detail";
    li3.style.borderBottom = "0px";
    li3.style.display = "flex";
    li3.style.flexDirection = "column";
    li3.style.alignItems = "left";
    li3.style.justifyContent = "space-between";
    li3.style.borderBottom = "1px solid #e5e7eb";
    li3.style.paddingTop = "0.9em";
    li3.style.paddingBottom = "0.9em";
    var bank = document.createElement("span");
    // bank.className = "payment-detail-text modal-email";
    bank.textContent = "Bank name";
    bank.style.fontFamily = "GraphikRegular, sans-serif";
    bank.style.color = "#8f9bb2";
    var bankDetails = document.createElement("span");
    // bankDetails.className = "payment-detail-bold text-truncate";
    bankDetails.textContent = `${data?.bank_name}`;
    bankDetails.style.width = "125px";
    bankDetails.style.whiteSpace = "nowrap";
    bankDetails.style.overflow = "hidden";
    bankDetails.style.textOverflow = "ellipsis";
    bankDetails.style.fontFamily = "GraphikMedium, sans-serif";
    bankDetails.style.fontWeight = "500";
    bankDetails.style.textAlign = "left";
    bankDetails.style.color = "#000";
    bankDetails.style.marginTop = "5px";
    li3.appendChild(bank);
    li3.appendChild(bankDetails);

    // UL MAKE UP
    paymentDetails.appendChild(li1);
    paymentDetails.appendChild(li2);
    paymentDetails.appendChild(li3);
    // modalBody.appendChild(paymentDetails);

    // button and countdwon timer
    var modalFooter = document.createElement("div");
    // modalFooter.className = "modal-footer";
    modalFooter.style.display = "flex";
    modalFooter.style.flexDirection = "column";
    modalFooter.style.width = "100%";
    modalFooter.style.paddingTop = "0.5rem";
    modalFooter.style.paddingBottom = "1.5rem";
    var paybutton = document.createElement("button");
    // paybutton.className = "modal-req-acc-btn";
    paybutton.style.border = "1px solid #d0d5e9";
    paybutton.style.filter = "drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.05))";
    paybutton.style.borderRadius = "8px";
    paybutton.style.textAlign = "center";
    paybutton.style.width = "80%";
    paybutton.style.color = "#000";
    paybutton.style.fontWeight = "500";
    paybutton.style.fontSize = "1.125rem";
    paybutton.style.height = "2.75rem";
    paybutton.style.margin = "auto";
    paybutton.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    paybutton.textContent = "Request for new account";

    // modalFooter.appendChild(paybutton);
    // secure by pooler
    var secureTextContainer = document.createElement("div");
    // secureTextContainer.className = "absolute footer-text";
    secureTextContainer.style.position = "absolute";
    secureTextContainer.style.top = "103%";
    secureTextContainer.style.left = "27%";
    secureTextContainer.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    var htmlContent = document.createElement("div");
    htmlContent.style.display = "flex";
    htmlContent.style.flexDirection = "row";
    htmlContent.style.paddingTop = "8px";
    htmlContent.style.color = "white";
    htmlContent.style.alignItems = "center";
    var htmlContent = `<div style="color: #fff; display: flex; align-items: center; gap: "20px"; flex: row; align-items: center;"><p>Secured by</p><span><svg width="94" height="24" viewBox="0 0 94 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.787 9.08492L17.6895 7.9369C17.4357 7.8036 17.1724 7.68782 16.9016 7.59047C16.1688 7.31931 15.3902 7.18079 14.6049 7.18189H7.44238L8.57455 20.0968H12.1373V19.4906H14.6049C15.4462 19.4906 16.2792 19.3312 17.0565 19.0219C17.8337 18.7124 18.5398 18.2588 19.1346 17.6869C19.7293 17.1151 20.201 16.4363 20.5228 15.6892C20.8446 14.9421 21.01 14.1415 21.0096 13.3329V13.3063C20.9968 12.0632 20.5027 10.8693 19.6233 9.95762L18.787 9.08492Z" fill="#52A1FF"/>
  <path d="M19.3899 11.696C19.3902 12.5047 19.2247 13.3056 18.9028 14.0528C18.581 14.8 18.109 15.479 17.514 16.0508C16.919 16.6227 16.2126 17.0762 15.4351 17.3856C14.6576 17.6949 13.8244 17.854 12.9829 17.8537H10.5176V20.0921H5.82959V5.54053H12.9921C14.1147 5.53913 15.2178 5.82255 16.1899 6.36214L17.694 7.93433L17.9597 8.21411C18.8697 9.15265 19.3815 10.3844 19.3945 11.6671L19.3899 11.696Z" fill="#1F7AFF"/>
  <path d="M17.4583 10.093C17.4589 11.7247 16.7853 13.29 15.5857 14.4446C14.386 15.5993 12.7583 16.2489 11.0605 16.2507H8.58365V20.0923H3.89795V3.9375H11.0605C12.0375 3.93789 13.0013 4.15346 13.8781 4.56767C14.7548 4.98186 15.5211 5.58366 16.1182 6.32685C16.9877 7.40777 17.459 8.73559 17.4583 10.1019V10.093Z" fill="#2C1DFF"/>
  <path d="M27.7319 19.9327H30.6945V14.2169H32.9221C36.3302 14.2169 38.7582 12.809 38.7582 9.63592V9.55186C38.7582 6.39979 36.4193 4.90781 32.8552 4.90781H27.7319V19.9327ZM30.6945 12.1996V7.07223H32.8552C34.7486 7.07223 35.8624 7.76569 35.8624 9.55186V9.63592C35.8624 11.296 34.8155 12.1996 32.8552 12.1996H30.6945Z" fill="white"/>
  <path d="M45.5238 18.1675C43.4745 18.1675 42.2939 16.7596 42.2939 14.5111V14.343C42.2939 12.0735 43.519 10.7076 45.5238 10.7076C47.5286 10.7076 48.7314 12.0945 48.7314 14.364V14.5111C48.7314 16.7596 47.5286 18.1675 45.5238 18.1675ZM45.5015 20.1428C48.9319 20.1428 51.4936 17.9154 51.4936 14.4901V14.322C51.4936 10.9598 48.9319 8.71131 45.5238 8.71131C42.0934 8.71131 39.5317 10.9808 39.5317 14.385V14.5532C39.5317 17.8944 42.0711 20.1428 45.5015 20.1428Z" fill="white"/>
  <path d="M58.6958 18.1675C56.6465 18.1675 55.4659 16.7596 55.4659 14.5111V14.343C55.4659 12.0735 56.691 10.7076 58.6958 10.7076C60.7006 10.7076 61.9034 12.0945 61.9034 14.364V14.5111C61.9034 16.7596 60.7006 18.1675 58.6958 18.1675ZM58.6735 20.1428C62.1039 20.1428 64.6656 17.9154 64.6656 14.4901V14.322C64.6656 10.9598 62.1039 8.71131 58.6958 8.71131C55.2654 8.71131 52.7037 10.9808 52.7037 14.385V14.5532C52.7037 17.8944 55.2431 20.1428 58.6735 20.1428Z" fill="white"/>
  <path d="M66.7222 19.9327H69.4175V3.85712H66.7222V19.9327Z" fill="white"/>
  <path d="M77.3806 20.1428C80.3655 20.1428 82.348 18.882 82.7266 16.5705H80.1204C79.9199 17.6422 79.0735 18.2516 77.4474 18.2516C75.4426 18.2516 74.3289 17.0748 74.2398 14.9944H82.7712V14.259C82.7712 10.3294 80.165 8.71131 77.2692 8.71131C73.9502 8.71131 71.4776 10.9808 71.4776 14.385V14.5532C71.4776 18.0204 73.9502 20.1428 77.3806 20.1428ZM74.2843 13.2923C74.5516 11.5902 75.6431 10.5605 77.2692 10.5605C78.9398 10.5605 79.9645 11.4011 80.0982 13.2923H74.2843Z" fill="white"/>
  <path d="M84.7332 19.9327H87.4285V14.2169C87.4285 11.8844 88.8541 11.1699 91.2153 11.1489V8.77435C89.255 8.79537 88.1635 9.6149 87.4285 11.0018V8.94246H84.7332V19.9327Z" fill="white"/>
  </svg>
  </span></div>`;
    secureTextContainer.innerHTML = htmlContent;
    modalContent.appendChild(secureTextContainer);

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    failureModal.appendChild(modalContent);
    // document.body.appendChild(failureModal);

    failureIFrame.addEventListener("load", () => {
      var iframeWindow = failureIFrame.contentWindow;
      iframeWindow.document.body.appendChild(failureModal);
    });

    document.body.appendChild(failureIFrame);

    // CHECK TO SEE MULTIPLE ERROR IFRAMES EXIST, KEEP 1 AND REMOVE THE REST
    var idToRemove = "error-iframe";
    var elementsWithId = document.querySelectorAll('[id="' + idToRemove + '"]');

    if (elementsWithId.length > 1) {
      // Keep the first element and remove the rest
      for (var i = 1; i < elementsWithId.length; i++) {
        elementsWithId[i].parentNode.removeChild(elementsWithId[i]);
      }
    }

    var iframeRemove = "pooler-iframe";
    var elementsWithIframe = document.querySelectorAll(
      '[id="' + iframeRemove + '"]'
    );
    if (elementsWithIframe.length > 0) {
      // Keep the first element and remove the rest
      for (var i = 0; i < elementsWithIframe.length; i++) {
        elementsWithIframe[i].parentNode.removeChild(elementsWithIframe[i]);
      }
    }

    closeBtn.addEventListener("click", function () {
      failureIFrame.parentNode.removeChild(failureIFrame);
      failureModal.style.display = "none";
      overlay.style.display = "none";
      var childNodes = document.body.childNodes;
      var desiredChild = null;
      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i].id === "error-iframe") {
          desiredChild = childNodes[i];
          break;
        }
      }
      if (desiredChild) {
        var parent = desiredChild.parentNode;
        parent.removeChild(desiredChild);
      }
    });
  }

  // ON VALIDATION
  function onValidation(data) {
    // spins up failure expiration iframe
    var failureIFrame = document.createElement("iframe");
    failureIFrame.id = "failure-iframe";
    failureIFrame.style.position = "fixed";
    failureIFrame.style.top = "0";
    failureIFrame.style.left = "0";
    failureIFrame.style.width = "100%";
    failureIFrame.style.height = "100%";
    failureIFrame.style.border = "none";
    failureIFrame.style.display = "flex";

    var failureModal = document.createElement("div");
    failureModal.setAttribute("id", "failure-modal");
    // modal.className = "modal";
    failureModal.style.display = "block";
    failureModal.style.position = "fixed";
    failureModal.style.zIndex = "9999";
    failureModal.style.top = "0";
    failureModal.style.left = "0";
    failureModal.style.paddingTop = "5%";
    failureModal.style.width = "100%";
    failureModal.style.height = "100%";
    failureModal.style.overflow = "auto";
    failureModal.style.backgroundColor = "rgb(0, 0, 0, 0.3)";

    var modalContent = document.createElement("div");
    // modalContent.className = "modal-content";
    modalContent.style.backgroundColor = "#fefefe";
    modalContent.style.margin = "auto";
    modalContent.style.width = "100%";
    modalContent.style.borderRadius = "8px";
    modalContent.style.position = "relative";
    modalContent.style.maxWidth = "450px";
    modalContent.style.boxShadow = "0 4px 15px 0 rgba(0,0,0,.2)";

    var closeBtn = document.createElement("div");
    closeBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17 7L7 17M7 7L17 17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

    // closeBtn.className = "close close-img";
    closeBtn.style.color = "#000";
    closeBtn.style.float = "right";
    closeBtn.style.marginTop = "0px";
    closeBtn.style.position = "absolute";
    closeBtn.style.right = "-2%";
    closeBtn.style.top = "-2%";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.backgroundColor = "#FAFAFD";
    closeBtn.style.padding = "2px 3px";
    closeBtn.style.borderRadius = "100%";

    // modal text parent
    var modalTextParent = document.createElement("div");
    // modalTextParent.className = "modal-text-parent";
    modalTextParent.style.background = "#F5F6FB";
    modalTextParent.style.borderTopLeftRadius = "8px";
    modalTextParent.style.borderTopRightRadius = "8px";
    modalTextParent.style.borderBottom = "1px solid #e0e4f4";
    modalTextParent.style.padding = "20px";
    modalContent.appendChild(modalTextParent);

    // modal header
    var modalText = document.createElement("div");
    modalText.style.display = "flex";
    modalText.style.flexDirection = "row";
    modalText.style.alignItems = "center";
    modalText.style.justifyContent = "space-between";

    // pooler image icon
    var poolerIcon = document.createElement("div");
    // poolerIcon.innerHTML = poolerLogo;
    poolerIcon.innerHTML = `<svg width="122" height="32" viewBox="0 0 122 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M24.383 12.1136L22.9586 10.5829C22.6293 10.4051 22.2876 10.2508 21.936 10.121C20.985 9.75941 19.9744 9.57471 18.9553 9.57618H9.65918L11.1286 26.7961H15.7526V25.9878H18.9553C20.0471 25.9878 21.1283 25.7753 22.137 25.3628C23.1457 24.9502 24.0622 24.3454 24.8341 23.5829C25.606 22.8205 26.2182 21.9154 26.6358 20.9193C27.0535 19.9232 27.2682 18.8556 27.2677 17.7776V17.742C27.251 16.0846 26.6098 14.4928 25.4684 13.2772L24.383 12.1136Z" fill="#52A1FF"/>
  <path d="M25.166 15.594C25.1664 16.6723 24.9516 17.7401 24.5338 18.7364C24.116 19.7327 23.5035 20.638 22.7313 21.4004C21.9591 22.1629 21.0422 22.7676 20.0332 23.1801C19.0241 23.5926 17.9426 23.8047 16.8505 23.8043H13.6508V26.7888H7.56641V7.38673H16.8625C18.3194 7.38485 19.7511 7.76275 21.0127 8.4822L22.9649 10.5785L23.3098 10.9515C24.4908 12.2029 25.1551 13.8452 25.172 15.5555L25.166 15.594Z" fill="#1F7AFF"/>
  <path d="M22.6592 13.4573C22.6599 15.633 21.7858 17.72 20.2287 19.2595C18.6717 20.7991 16.5592 21.6652 14.3556 21.6676H11.141V26.7897H5.05957V5.25H14.3556C15.6236 5.25052 16.8746 5.53795 18.0125 6.09023C19.1504 6.64248 20.145 7.44487 20.9199 8.4358C22.0484 9.87702 22.6601 11.6474 22.6592 13.4691V13.4573Z" fill="#2C1DFF"/>
  <path d="M35.9932 26.5767H39.8383V18.9557H42.7293C47.1526 18.9557 50.3038 17.0784 50.3038 12.8476V12.7356C50.3038 8.53281 47.2682 6.5435 42.6426 6.5435H35.9932V26.5767ZM39.8383 16.2659V9.4294H42.6426C45.1 9.4294 46.5455 10.354 46.5455 12.7356V12.8476C46.5455 15.0611 45.1867 16.2659 42.6426 16.2659H39.8383Z" fill="black"/>
  <path d="M59.0847 24.2231C56.425 24.2231 54.8927 22.3459 54.8927 19.3479V19.1238C54.8927 16.0978 56.4828 14.2766 59.0847 14.2766C61.6867 14.2766 63.2478 16.1258 63.2478 19.1518V19.3479C63.2478 22.3459 61.6867 24.2231 59.0847 24.2231ZM59.0558 26.8569C63.508 26.8569 66.8327 23.8869 66.8327 19.3199V19.0958C66.8327 14.6128 63.508 11.6148 59.0847 11.6148C54.6325 11.6148 51.3078 14.6408 51.3078 19.1798V19.404C51.3078 23.8589 54.6036 26.8569 59.0558 26.8569Z" fill="black"/>
  <path d="M76.1803 24.2231C73.5205 24.2231 71.9883 22.3459 71.9883 19.3479V19.1238C71.9883 16.0978 73.5783 14.2766 76.1803 14.2766C78.7822 14.2766 80.3434 16.1258 80.3434 19.1518V19.3479C80.3434 22.3459 78.7822 24.2231 76.1803 24.2231ZM76.1514 26.8569C80.6036 26.8569 83.9283 23.8869 83.9283 19.3199V19.0958C83.9283 14.6128 80.6036 11.6148 76.1803 11.6148C71.7281 11.6148 68.4034 14.6408 68.4034 19.1798V19.404C68.4034 23.8589 71.6992 26.8569 76.1514 26.8569Z" fill="black"/>
  <path d="M86.5975 26.5767H90.0957V5.14258H86.5975V26.5767Z" fill="black"/>
  <path d="M100.431 26.8569C104.305 26.8569 106.878 25.1758 107.369 22.0937H103.987C103.727 23.5227 102.628 24.3352 100.517 24.3352C97.9155 24.3352 96.47 22.7662 96.3544 19.9923H107.427V19.0117C107.427 13.7723 104.045 11.6148 100.286 11.6148C95.9785 11.6148 92.7695 14.6408 92.7695 19.1798V19.404C92.7695 24.027 95.9785 26.8569 100.431 26.8569ZM96.4122 17.7229C96.7591 15.4534 98.1757 14.0805 100.286 14.0805C102.454 14.0805 103.784 15.2012 103.958 17.7229H96.4122Z" fill="black"/>
  <path d="M109.973 26.5767H113.472V18.9557C113.472 15.8456 115.322 14.893 118.386 14.865V11.6989C115.842 11.7269 114.426 12.8196 113.472 14.6688V11.923H109.973V26.5767Z" fill="black"/>
  </svg>
  `;
    poolerIcon.style.width = "32px";
    poolerIcon.style.height = "32px";
    modalText.appendChild(poolerIcon);

    // amount and email address column
    var modalAmountEmail = document.createElement("div");
    // modalAmountEmail.className = "modal-amt-email";
    modalAmountEmail.style.display = "flex";
    modalAmountEmail.style.flexDirection = "column";
    modalAmountEmail.style.marginTop = "0.25rem";
    modalText.appendChild(modalAmountEmail);
    modalTextParent.appendChild(modalText);

    // amount
    var modalAmount = document.createElement("div");
    // modalAmount.className = "modal-amount modal-amt";
    modalAmount.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    modalAmount.style.fontWeight = "600";
    modalAmount.style.color = "#000";
    modalAmount.style.textAlign = "end";
    modalAmount.style.textAlign = "right";
    modalAmount.style.fontSize = "1.125rem";
    modalAmount.style.paddingBottom = "8px";
    modalAmount.textContent = ``;
    modalAmountEmail.appendChild(modalAmount);

    // email
    var modalEmail = document.createElement("div");
    // modalEmail.className = "modal-email modal-em";
    modalEmail.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    modalEmail.style.color = "#8f9bb2";
    modalEmail.style.fontStyle = "normal";
    modalEmail.style.fontSize = "1rem";
    modalEmail.textContent = ``;
    modalAmountEmail.appendChild(modalEmail);

    // modal body
    var modalBody = document.createElement("div");
    // modalBody.className = "modal-body";
    modalBody.style.display = "flex";
    modalBody.style.flexDirection = "column";
    modalBody.style.position = "relative";
    modalBody.style.justifyContent = "center";
    modalBody.style.paddingTop = "25px";

    // merchant details
    var paymentDetails = document.createElement("ul");
    // paymentDetails.className = "payment-details";
    paymentDetails.style.listStyleType = "none";
    paymentDetails.style.display = "flex";
    paymentDetails.style.flexDirection = "column";
    paymentDetails.style.width = "79%";
    paymentDetails.style.marginBottom = "30px";
    paymentDetails.style.position = "relative";
    paymentDetails.style.marginTop = "30px";

    // SUCCESS CONTAINER
    var successContainer = document.createElement("div");
    successContainer.style.background = "#FFE5EC";
    // successContainer.className = "awaiting-container";
    successContainer.style.alignItems = "center";
    successContainer.style.display = "flex";
    successContainer.style.flexDirection = "column";
    successContainer.style.borderRadius = "0.5rem";
    successContainer.style.margin = "auto";
    successContainer.style.width = "90%";
    successContainer.style.paddingTop = "1.5rem";
    successContainer.style.paddingBottom = "1.5rem";
    successContainer.style.marginTop = "25px";
    successContainer.style.marginBottom = "35px";
    successContainer.style.justifyContent = "center";
    successContainer.style.marginTop = "30px";
    successContainer.style.margin = "auto";
    modalBody.appendChild(successContainer);

    // loader
    var successIcon = document.createElement("div");
    successIcon = `<svg width="93" height="67" viewBox="0 0 93 67" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: auto; text-align: center; ">
  <g filter="url(#filter0_d_467_8419)">
  <rect width="91" height="65" rx="4" fill="white"/>
  </g>
  <rect x="5" y="5" width="81" height="55" rx="2" fill="#FFE5EC"/>
  <path d="M5 7C5 5.89543 5.89543 5 7 5H63V44C63 45.1046 62.1046 46 61 46H5V7Z" fill="#FFCCD8"/>
  <path d="M5 7C5 5.89543 5.89543 5 7 5H39V28C39 29.1046 38.1046 30 37 30H5V7Z" fill="#FF99B1"/>
  <circle cx="66.5" cy="40.5" r="14.5" fill="#FF003D"/>
  <path d="M67 33L67 42" stroke="white" stroke-width="4" stroke-linecap="round"/>
  <path d="M67 48L67 49" stroke="white" stroke-width="4" stroke-linecap="round"/>
  <defs>
  <filter id="filter0_d_467_8419" x="0" y="0" width="93" height="67" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset dx="2" dy="2"/>
  <feComposite in2="hardAlpha" operator="out"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_467_8419"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_467_8419" result="shape"/>
  </filter>
  </defs>
  </svg>`;
    successContainer.innerHTML = successIcon;

    var awaitingConfirmation = document.createElement("div");
    awaitingConfirmation.textContent = "Wrong Credentials!";
    awaitingConfirmation.style.fontFamily = "GraphikMedium, sans-serif";
    awaitingConfirmation.style.paddingTop = "5px";
    awaitingConfirmation.style.fontFamily = "GraphikRegular, sans-serif";
    awaitingConfirmation.style.textAlign = "center";
    awaitingConfirmation.style.fontSize = "16px";
    awaitingConfirmation.style.paddingTop = "20px";
    awaitingConfirmation.style.color = "#FF003D";
    awaitingConfirmation.style.fontWeight = "500";
    awaitingConfirmation.className = "transferToMerchant modal-amount";
    successContainer.appendChild(awaitingConfirmation);

    var successMessage = document.createElement("div");
    successMessage.className = "awaiting-message modal-email";
    successMessage.style.fontFamily = "GraphikRegular, sans-serif";
    successMessage.style.margin = "auto";
    successMessage.style.width = "80%";
    successMessage.style.fontSize = "14px";
    successMessage.style.textAlign = "center";
    successMessage.style.paddingTop = "20px";
    successMessage.style.color = "#000";
    successMessage.textContent = "Please, try again!";
    successContainer.appendChild(successMessage);

    // LIST 1
    var li1 = document.createElement("li");
    // li1.className = "payment-detail";
    li1.style.display = "flex";
    li1.style.flexDirection = "column";
    li1.style.alignItems = "left";
    li1.style.justifyContent = "space-between";
    li1.style.borderBottom = "1px solid #e5e7eb";
    li1.style.paddingTop = "0.9em";
    li1.style.paddingBottom = "0.9em";
    var merchant = document.createElement("span");
    // merchant.className = "payment-detail-text modal-email";
    merchant.textContent = "Merchant";
    var merchatName = document.createElement("span");
    // merchatName.className = "payment-detail-bold text-truncate";
    merchatName.style.fontFamily = "GraphikMedium, sans-serif";
    merchatName.style.fontWeight = "500";
    merchatName.style.color = "#000";
    merchant.style.fontFamily = "GraphikRegular, sans-serif";
    merchant.style.color = "#8f9bb2";
    merchatName.style.fontWeight = "500";
    merchatName.style.color = "#000";
    merchatName.style.marginTop = "5px";
    merchatName.textContent = `${data.display_name}`;
    li1.appendChild(merchant);
    li1.appendChild(merchatName);

    // LIST 2
    var li2 = document.createElement("li");
    // li2.className = "payment-detail";
    li2.style.display = "flex";
    li2.style.flexDirection = "column";
    li2.style.alignItems = "left";
    li2.style.justifyContent = "space-between";
    li2.style.borderBottom = "1px solid #e5e7eb";
    li2.style.paddingTop = "0.9em";
    li2.style.paddingBottom = "0.9em";
    var accNum = document.createElement("span");
    // accNum.className = "payment-detail-text modal-email";
    accNum.textContent = "Account Number";
    accNum.style.fontFamily = "GraphikRegular, sans-serif";
    accNum.style.color = "#8f9bb2";
    var accDetails = document.createElement("span");
    accDetails.className = "payment-detail-bold row-span";
    accDetails.textContent = `${data?.account_no}`;
    accDetails.style.fontFamily = "GraphikMedium, sans-serif";
    accDetails.style.fontWeight = "500";
    accDetails.style.color = "#000";
    accDetails.style.display = "flex";
    accDetails.style.flexDirection = "row";
    accDetails.style.marginTop = "5px";
    var copy = document.createElement("div");
    copy.className = "copy";
    // copy.innerHTML = copyIcon;
    copy.innerHTML = `<svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 14C3.06812 14 2.60218 14 2.23463 13.8478C1.74458 13.6448 1.35523 13.2554 1.15224 12.7654C1 12.3978 1 11.9319 1 11V4.2C1 3.0799 1 2.51984 1.21799 2.09202C1.40973 1.71569 1.71569 1.40973 2.09202 1.21799C2.51984 1 3.0799 1 4.2 1H11C11.9319 1 12.3978 1 12.7654 1.15224C13.2554 1.35523 13.6448 1.74458 13.8478 2.23463C14 2.60218 14 3.06812 14 4M11.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V11.2C21 10.0799 21 9.51984 20.782 9.09202C20.5903 8.7157 20.2843 8.40973 19.908 8.21799C19.4802 8 18.9201 8 17.8 8H11.2C10.0799 8 9.51984 8 9.09202 8.21799C8.7157 8.40973 8.40973 8.7157 8.21799 9.09202C8 9.51984 8 10.0799 8 11.2V17.8C8 18.9201 8 19.4802 8.21799 19.908C8.40973 20.2843 8.7157 20.5903 9.09202 20.782C9.51984 21 10.0799 21 11.2 21Z" stroke="#CBD1EC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
    copy.style.width = "20px";
    copy.style.height = "20px";
    copy.style.position = "absolute";
    copy.style.left = "102%";
    copy.style.cursor = "pointer";
    copy.addEventListener("click", function () {
      navigator.clipboard.writeText(`${data?.account_no}`);
    });
    accDetails.appendChild(copy);
    li2.appendChild(accNum);
    li2.appendChild(accDetails);

    // LIST 3
    var li3 = document.createElement("li");
    // li3.className = "payment-detail";
    li3.style.borderBottom = "0px";
    li3.style.display = "flex";
    li3.style.flexDirection = "column";
    li3.style.alignItems = "left";
    li3.style.justifyContent = "space-between";
    li3.style.borderBottom = "1px solid #e5e7eb";
    li3.style.paddingTop = "0.9em";
    li3.style.paddingBottom = "0.9em";
    var bank = document.createElement("span");
    // bank.className = "payment-detail-text modal-email";
    bank.textContent = "Bank name";
    bank.style.fontFamily = "GraphikRegular, sans-serif";
    bank.style.color = "#8f9bb2";
    var bankDetails = document.createElement("span");
    // bankDetails.className = "payment-detail-bold text-truncate";
    bankDetails.textContent = `${data?.bank_name}`;
    bankDetails.style.width = "125px";
    bankDetails.style.whiteSpace = "nowrap";
    bankDetails.style.overflow = "hidden";
    bankDetails.style.textOverflow = "ellipsis";
    bankDetails.style.fontFamily = "GraphikMedium, sans-serif";
    bankDetails.style.fontWeight = "500";
    bankDetails.style.textAlign = "left";
    bankDetails.style.color = "#000";
    bankDetails.style.marginTop = "5px";
    li3.appendChild(bank);
    li3.appendChild(bankDetails);

    // UL MAKE UP
    paymentDetails.appendChild(li1);
    paymentDetails.appendChild(li2);
    paymentDetails.appendChild(li3);
    // modalBody.appendChild(paymentDetails);

    // button and countdwon timer
    var modalFooter = document.createElement("div");
    // modalFooter.className = "modal-footer";
    modalFooter.style.display = "flex";
    modalFooter.style.flexDirection = "column";
    modalFooter.style.width = "100%";
    modalFooter.style.paddingTop = "0.5rem";
    modalFooter.style.paddingBottom = "1.5rem";
    var paybutton = document.createElement("button");
    // paybutton.className = "modal-req-acc-btn";
    paybutton.style.border = "1px solid #d0d5e9";
    paybutton.style.filter = "drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.05))";
    paybutton.style.borderRadius = "8px";
    paybutton.style.textAlign = "center";
    paybutton.style.width = "80%";
    paybutton.style.color = "#000";
    paybutton.style.fontWeight = "500";
    paybutton.style.fontSize = "1.125rem";
    paybutton.style.height = "2.75rem";
    paybutton.style.margin = "auto";
    paybutton.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    paybutton.textContent = "Request for new account";
    paybutton.addEventListener("click", async function () {
      paybutton.textContent = "Requesting...";
      failureIFrame.style.display = "none";
      overlay.style.display = "none";
      // generate signature to request for another account
      function getSignature(callback) {
        var url = "wss://websocket.swim.poolerapp.com";
        const signatureSocket = new WebSocket(url);
        signatureSocket.addEventListener("open", () => {});
        signatureSocket.addEventListener("message", (e) => {
          const response = JSON.parse(e?.data);
          if (response?.message) {
            callback(response?.signature);
          }
        });
        signatureSocket.addEventListener("close", () => {});
      }
      getSignature((signature) => {
        var reqObject = {
          email: data?.email,
          action: "initialize",
          amount: data?.amount,
          signature: signature,
          pub_key: data?.pub_key,
        };
        var url = "wss://websocket.swim.poolerapp.com";
        const socket = new WebSocket(`${url}`);
        socket.addEventListener("open", () => {
          socket.send(JSON.stringify(reqObject));
        });

        socket.addEventListener("message", (e) => {
          const response = JSON.parse(e?.data);
          if (!response?.signature) {
            overlay.style.display = "none";
            const paymentInfo = {
              email: merchantConfig?.email,
              amount: merchantConfig?.amount,
              display_name: merchantConfig?.display_name,
              account_no: response?.data?.account_no,
              currency_code: response?.data?.currency_code,
              bank_name: response?.data?.bank_name,
              pub_key: merchantConfig?.pub_key,
            };
            showMerchantModal(paymentInfo);
            overlay.style.backgroundColor = "transparent";
            spinner.style.display = "none";
            overlay.style.display = "none";
            iframe.style.display = "none";
          }
        });

        socket.addEventListener("error", () => {
          paybutton.textContent = "Request for new account";
        });

        socket.addEventListener("close", (e) => {
          return e;
        });
      });
    });

    // modalFooter.appendChild(paybutton);

    // secure by pooler
    var secureTextContainer = document.createElement("div");
    // secureTextContainer.className = "absolute footer-text";
    secureTextContainer.style.position = "absolute";
    secureTextContainer.style.top = "103%";
    secureTextContainer.style.left = "27%";
    secureTextContainer.style.fontFamily =
      '"GraphikMedium", "Source Sans Pro", sans-serif';
    var htmlContent = document.createElement("div");
    htmlContent.style.display = "flex";
    htmlContent.style.flexDirection = "row";
    htmlContent.style.paddingTop = "8px";
    htmlContent.style.color = "white";
    htmlContent.style.alignItems = "center";
    var htmlContent = `<div style="color: #fff; display: flex; align-items: center; gap: "20px"; flex: row; align-items: center;"><p>Secured by</p><span><svg width="94" height="24" viewBox="0 0 94 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.787 9.08492L17.6895 7.9369C17.4357 7.8036 17.1724 7.68782 16.9016 7.59047C16.1688 7.31931 15.3902 7.18079 14.6049 7.18189H7.44238L8.57455 20.0968H12.1373V19.4906H14.6049C15.4462 19.4906 16.2792 19.3312 17.0565 19.0219C17.8337 18.7124 18.5398 18.2588 19.1346 17.6869C19.7293 17.1151 20.201 16.4363 20.5228 15.6892C20.8446 14.9421 21.01 14.1415 21.0096 13.3329V13.3063C20.9968 12.0632 20.5027 10.8693 19.6233 9.95762L18.787 9.08492Z" fill="#52A1FF"/>
  <path d="M19.3899 11.696C19.3902 12.5047 19.2247 13.3056 18.9028 14.0528C18.581 14.8 18.109 15.479 17.514 16.0508C16.919 16.6227 16.2126 17.0762 15.4351 17.3856C14.6576 17.6949 13.8244 17.854 12.9829 17.8537H10.5176V20.0921H5.82959V5.54053H12.9921C14.1147 5.53913 15.2178 5.82255 16.1899 6.36214L17.694 7.93433L17.9597 8.21411C18.8697 9.15265 19.3815 10.3844 19.3945 11.6671L19.3899 11.696Z" fill="#1F7AFF"/>
  <path d="M17.4583 10.093C17.4589 11.7247 16.7853 13.29 15.5857 14.4446C14.386 15.5993 12.7583 16.2489 11.0605 16.2507H8.58365V20.0923H3.89795V3.9375H11.0605C12.0375 3.93789 13.0013 4.15346 13.8781 4.56767C14.7548 4.98186 15.5211 5.58366 16.1182 6.32685C16.9877 7.40777 17.459 8.73559 17.4583 10.1019V10.093Z" fill="#2C1DFF"/>
  <path d="M27.7319 19.9327H30.6945V14.2169H32.9221C36.3302 14.2169 38.7582 12.809 38.7582 9.63592V9.55186C38.7582 6.39979 36.4193 4.90781 32.8552 4.90781H27.7319V19.9327ZM30.6945 12.1996V7.07223H32.8552C34.7486 7.07223 35.8624 7.76569 35.8624 9.55186V9.63592C35.8624 11.296 34.8155 12.1996 32.8552 12.1996H30.6945Z" fill="white"/>
  <path d="M45.5238 18.1675C43.4745 18.1675 42.2939 16.7596 42.2939 14.5111V14.343C42.2939 12.0735 43.519 10.7076 45.5238 10.7076C47.5286 10.7076 48.7314 12.0945 48.7314 14.364V14.5111C48.7314 16.7596 47.5286 18.1675 45.5238 18.1675ZM45.5015 20.1428C48.9319 20.1428 51.4936 17.9154 51.4936 14.4901V14.322C51.4936 10.9598 48.9319 8.71131 45.5238 8.71131C42.0934 8.71131 39.5317 10.9808 39.5317 14.385V14.5532C39.5317 17.8944 42.0711 20.1428 45.5015 20.1428Z" fill="white"/>
  <path d="M58.6958 18.1675C56.6465 18.1675 55.4659 16.7596 55.4659 14.5111V14.343C55.4659 12.0735 56.691 10.7076 58.6958 10.7076C60.7006 10.7076 61.9034 12.0945 61.9034 14.364V14.5111C61.9034 16.7596 60.7006 18.1675 58.6958 18.1675ZM58.6735 20.1428C62.1039 20.1428 64.6656 17.9154 64.6656 14.4901V14.322C64.6656 10.9598 62.1039 8.71131 58.6958 8.71131C55.2654 8.71131 52.7037 10.9808 52.7037 14.385V14.5532C52.7037 17.8944 55.2431 20.1428 58.6735 20.1428Z" fill="white"/>
  <path d="M66.7222 19.9327H69.4175V3.85712H66.7222V19.9327Z" fill="white"/>
  <path d="M77.3806 20.1428C80.3655 20.1428 82.348 18.882 82.7266 16.5705H80.1204C79.9199 17.6422 79.0735 18.2516 77.4474 18.2516C75.4426 18.2516 74.3289 17.0748 74.2398 14.9944H82.7712V14.259C82.7712 10.3294 80.165 8.71131 77.2692 8.71131C73.9502 8.71131 71.4776 10.9808 71.4776 14.385V14.5532C71.4776 18.0204 73.9502 20.1428 77.3806 20.1428ZM74.2843 13.2923C74.5516 11.5902 75.6431 10.5605 77.2692 10.5605C78.9398 10.5605 79.9645 11.4011 80.0982 13.2923H74.2843Z" fill="white"/>
  <path d="M84.7332 19.9327H87.4285V14.2169C87.4285 11.8844 88.8541 11.1699 91.2153 11.1489V8.77435C89.255 8.79537 88.1635 9.6149 87.4285 11.0018V8.94246H84.7332V19.9327Z" fill="white"/>
  </svg>
  </span></div>`;
    secureTextContainer.innerHTML = htmlContent;
    modalContent.appendChild(secureTextContainer);

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    failureModal.appendChild(modalContent);
    // document.body.appendChild(failureModal);

    failureIFrame.addEventListener("load", () => {
      var iframeWindow = failureIFrame.contentWindow;
      iframeWindow.document.body.appendChild(failureModal);
    });

    document.body.appendChild(failureIFrame);

    closeBtn.addEventListener("click", function () {
      failureIFrame.parentNode.removeChild(failureIFrame);
      failureModal.style.display = "none";
      overlay.style.display = "none";
      var childNodes = document.body.childNodes;
      var desiredChild = null;
      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i].id === "failure-iframe") {
          desiredChild = childNodes[i];
          break;
        }
      }
      if (desiredChild) {
        var parent = desiredChild.parentNode;
        parent.removeChild(desiredChild);
      }
    });
  }

  function handleValidation(config) {
    if (config.email && config.amount && config.pub_key) {
      payWithPooler();
    } else {
      onValidation(config);
    }
  }

  handleValidation(config);
}

// TO DO
// IMPLEMENT SOCKET / PUSHER END POINT
// FIX BUGS ASSOCIATED WITH CHECKOUT
// STYLES
// PLUG IN THE PUSHER
// IMPLEMENT CALL BACKS
