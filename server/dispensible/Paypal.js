//Paypal
router.post('/successBuy', (req, res) =>{
  let history = [];
  let transactionData = {}

  //1.Put brief Payment Information inside User Collection

  req.body.cartDetail.forEach((item) =>{
    history.push({
      dateOfPurchase: Date.now(),
      name: item.title,
      id: item._id,
      price: item.Price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID
    })
  })


  //2.Put Payjent Information that come from Paypal into Payment Collection
    transactionData.user ={
      id: req.user._id,
      name: req.user.name,
      lastname: req.user, lastname,
      email: req.user.email
    }

    transactionData.data = req.body.paymentData
    transactionData.product = history

    User.findOneAndUpdate(
      {_id: req.user._id}
      {$push: {history: history}}// history}, $set:{cart:[]}
      {new: true},
      (err, user) => {
        if(err) return res.json({success:false, err})
      }
    )

})
