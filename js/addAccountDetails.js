$(document).ready(function() {
  const bearerToken = 'Gi8SqAS1ZvwJfw91kIo2EGQ7SNVkCX3nUmWiaEgha7cc7605';
  let banksData = [];

  function showToast(message) {
    // ...existing code...
  }

  async function fetchBanks() {
    try {
      const response = await fetch('https://supermx1.github.io/nigerian-banks-api/data.json');
      if (!response.ok) {
        throw new Error('Failed to fetch banks');
      }
      const banks = await response.json();
      banksData = banks; // Store the fetched banks data
      return banks;
    } catch (error) {
      showToast("Error fetching banks");
      console.error(error);
      return [];
    }
  }

  populateBankDropdown();

  $("#bank-name").change(function() {
    const selectedBankCode = $(this).val();
    localStorage.setItem('selectedBankCode', selectedBankCode);
    $(this).data('bank-code', selectedBankCode);
    $("#bank-name option").show(); // Show all options when a bank is selected
  });

  $("#bank-name").on('input', function() {
    const searchTerm = $(this).val().toLowerCase();
    if (searchTerm === "") {
      $("#bank-name option").show();
    } else {
      $("#bank-name option").each(function() {
        const bankName = $(this).text().toLowerCase();
        if (bankName.includes(searchTerm)) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }
  });

  async function populateBankDropdown() {
    const banks = await fetchBanks();
    const bankDropdown = $("#bank-name");
    banks.forEach(bank => {
      const option = new Option(bank.name, bank.code);
      $(option).data('bank-code', bank.code);
      bankDropdown.append(option);
    });
  }

  $("form").submit(async function(event) {
    event.preventDefault();
    const accountNumber = $("#account-number").val();
    const accountName = $("#account-name").val();
    const bankName = $("#bank-name").val();

    if (accountName.length < 5) {
      showToast("Account name must be at least 5 characters long!");
      return;
    }

    if (accountNumber.length !== 10) {
      showToast("Account Number should be 10 digits");
      return;
    }

    const formData = {
      accountNumber: accountNumber,
      accountName: accountName,
      bankName: bankName,
      bankCode: bankCode
    };

    console.log(JSON.stringify(formData));
  });
});


