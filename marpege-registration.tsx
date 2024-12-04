import React, { useState } from 'react';
import { Copy, CheckCircle, AlertCircle, CreditCard, Heart, Smartphone } from 'lucide-react';

const MarpegeRegistration = () => {
  const [copiedAccount, setCopiedAccount] = useState(null);
  const [thankYouClicked, setThankYouClicked] = useState(false);

  const paymentOptions = [
    {
      bank: 'Bank Mandiri',
      accountNumber: '183 000 381 8498',
      accountName: 'YUDI MUCHTAR PK SIRE'
    },
    {
      bank: 'BSI (Bank Syariah Indonesia)',
      accountNumber: '115 470 6705',
      accountName: 'YUDI MUCHTAR PK SIREGAR'
    },
    {
      bank: 'E-Wallet',
      accountNumber: '0813 9608 4064',
      accountName: 'YUDI MUCHTAR PK SIREGAR',
      note: 'Dana, ShopeePay, Link Aja, OVO, Dll.'
    }
  ];

  const handleCopyAccount = (account) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(account.accountNumber.replace(/\s/g, '')).then(() => {
        setCopiedAccount(account.bank);
        setTimeout(() => setCopiedAccount(null), 2000);
      }).catch(err => {
        console.error('Copy failed', err);
        fallbackCopyTextToClipboard(account.accountNumber.replace(/\s/g, ''));
      });
    } else {
      fallbackCopyTextToClipboard(account.accountNumber.replace(/\s/g, ''));
    }
  };

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedAccount('Bank');
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  const handleThankYouClick = () => {
    setThankYouClicked(true);
    setTimeout(() => setThankYouClicked(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden max-w-md w-full transform transition-all hover:scale-[1.02]">
        <div className="bg-gradient-to-r from-red-700 to-red-900 text-white p-6 text-center">
          <h1 className="text-4xl font-extrabold mb-3">Marpege-pege</h1>
          <p className="text-white/80">YUDI & IRA</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            {paymentOptions.map((account, index) => (
              <div 
                key={index} 
                className="bg-red-50 border-2 border-transparent group hover:border-red-300 rounded-xl p-4 flex items-center justify-between transition-all duration-300 ease-in-out"
              >
                <div className="flex items-center space-x-4">
                  {account.bank === 'E-Wallet' ? 
                    <Smartphone className="text-red-600 group-hover:scale-110 transition-transform" size={32} /> :
                    <CreditCard className="text-red-600 group-hover:scale-110 transition-transform" size={32} />
                  }
                  <div>
                    <h3 className="font-bold text-gray-800">{account.bank}</h3>
                    <p className="text-lg font-mono text-red-700 tracking-wider">{account.accountNumber}</p>
                    <p className="text-sm text-gray-500 mt-1">An: {account.accountName}</p>
                    {account.note && (
                      <p className="text-xs text-red-500 mt-1">{account.note}</p>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => handleCopyAccount(account)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 active:scale-90 transition-all"
                  aria-label="Copy Account Number"
                >
                  <Copy size={20} />
                </button>
              </div>
            ))}
          </div>

          {copiedAccount && (
            <div className="flex items-center justify-center bg-green-100 text-green-800 p-3 rounded-lg animate-pulse">
              <CheckCircle className="mr-2" size={20} />
              Nomor rekening berhasil disalin!
            </div>
          )}

          {!thankYouClicked ? (
            <button 
              onClick={handleThankYouClick}
              className="w-full bg-gradient-to-r from-red-700 to-red-900 text-white py-3 rounded-lg hover:from-red-800 hover:to-red-950 transition-colors font-semibold text-lg active:scale-[0.99] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Heart className="animate-pulse" size={20} />
              <span>Terima Kasih</span>
            </button>
          ) : (
            <div className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-4 rounded-lg text-center animate-bounce">
              <div className="flex items-center justify-center space-x-2">
                <Heart className="animate-pulse" size={24} />
                <span className="text-xl font-bold">Terima Kasih Banyak!</span>
                <Heart className="animate-pulse" size={24} />
              </div>
              <p className="text-sm mt-2 animate-pulse">Dukunganmu Sangat Berarti ❤️</p>
            </div>
          )}

          <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-2 opacity-70">
            <AlertCircle size={16} />
            Pastikan informasi rekening sudah benar
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarpegeRegistration;
