export function test_register() {
    env.write_register(0, "\x00\x01\xff");
    if (env.read_register(0) != "\x00\x01\xff") {
        env.panic()
    }
    if (env.register_len(0) != 3) {
        env.panic()
    }
    if (env.register_len(0) !== 3n) {
        env.panic()
    }

    if (env.read_register(1) !== undefined) {
        env.panic()
    }
    if (env.register_len(2) !== 18446744073709551615n ){
        env.panic()
    }
}

export function test_current_account_id() {
    env.current_account_id(0);
    if (env.read_register(0) != 'alice') {
        panic()
    }
}

export function test_signer_account_id() {
    env.signer_account_id(0);
    if (env.read_register(0) != 'bob') {
        panic()
    }
}

export function test_signer_account_pk() {
    env.signer_account_pk(0);
    if (env.read_register(0) != '\x00\x01\x02') {
        panic()
    }
}

export function test_predecessor_account_id() {
    env.predecessor_account_id(0);
    if (env.read_register(0) != "carol") {
        panic()
    }
}

export function test_input() {
    env.input(0);
    if (env.read_register(0) != 'aaaa') {
        panic()
    }
}

export function test_block_index() {
    if (env.block_index() != 1) {
        panic()
    }
}

export function test_block_timestamp() {
    if (env.block_timestamp() != 1586796191203000000n) {
        panic()
    }
}

export function test_epoch_height() {
    if (env.epoch_height() != 1) {
        panic()
    }
}

export function test_storage_usage() {
    if (env.storage_usage() != 100) {
        panic()
    }
}

export function test_account_balance() {
    if (env.account_balance() != 10000000000000000000000000n) {
        env.panic()
    }
}

export function test_account_locked_balance() {
    if (env.account_locked_balance() != 0) {
        env.panic()
    }
}

export function test_attached_deposit() {
    if (env.attached_deposit() != 0) {
        env.panic()
    }
}

export function test_prepaid_gas() {
    if (env.prepaid_gas() != 1000000000000000000) {
        env.panic()
    }
}

export function test_used_gas() {
    if (env.used_gas() == 0 || env.used_gas() > env.prepaid_gas()) {
        env.panic()
    }
}

export function test_random_seed() {
    env.random_seed(0)
    if (env.read_register(0) != '\x00\x01\x02') {
        env.panic()
    }
}

export function array_to_bytes(a) {
    let bytes = ''
    for(let e of a) {
        bytes += String.fromCharCode(e)
    }
    return bytes
}

export function test_sha256() {
    env.sha256("tesdsst", 0);
    if (env.read_register(0) != array_to_bytes([
        18, 176, 115, 156, 45, 100, 241, 132, 180, 134, 77, 42, 105, 111, 199, 127, 118, 112,
        92, 255, 88, 43, 83, 147, 122, 55, 26, 36, 42, 156, 160, 158,
    ])) {
        env.panic()
    }
}

export function test_keccak256() {
    env.keccak256("tesdsst", 0)
    if (env.read_register(0) != array_to_bytes([
        104, 110, 58, 122, 230, 181, 215, 145, 231, 229, 49, 162, 123, 167, 177, 58, 26, 142,
        129, 173, 7, 37, 9, 26, 233, 115, 64, 102, 61, 85, 10, 159,
    ])) {
        env.panic()
    }
}

export function test_keccak512() {
    env.keccak512("tesdsst", 0)
    if (env.read_register(0) != array_to_bytes([
        55, 134, 96, 137, 168, 122, 187, 95, 67, 76, 18, 122, 146, 11, 225, 106, 117, 194, 154,
        157, 48, 160, 90, 146, 104, 209, 118, 126, 222, 230, 200, 125, 48, 73, 197, 236, 123,
        173, 192, 197, 90, 153, 167, 121, 100, 88, 209, 240, 137, 86, 239, 41, 87, 128, 219,
        249, 136, 203, 220, 109, 46, 168, 234, 190
    ])) {
        env.panic()
    }
}

export function test_ripemd160() {
    env.ripemd160("tesdsst", 0)
    if (env.read_register(0) != array_to_bytes([
        21, 102, 156, 115, 232, 3, 58, 215, 35, 84, 129, 30, 143, 86, 212, 104, 70, 97, 14, 225,
    ])) {
        env.panic()
    }
}

export function test_ecrecover() {
    let hash = array_to_bytes([
        206,   6, 119, 187,  48, 186, 168, 207,
        6, 124, 136, 219, 152,  17, 244,  51,
       61,  19,  27, 248, 188, 241,  47, 231,
        6,  93,  33,  29, 206, 151,  16,   8
    ])
    let sign = array_to_bytes([
        144, 242, 123, 139,  72, 141, 176,  11,   0,  96, 103,
        150, 210, 152, 127, 106,  95,  89, 174,  98, 234,   5,
        239, 254, 132, 254, 245, 184, 176, 229,  73, 152,  74,
        105,  17,  57, 173,  87, 163, 240, 185,   6,  99, 118,
        115, 170,  47,  99, 209, 245,  92, 177, 166, 145, 153,
        212,   0, 158, 234,  35, 206, 173, 220, 147
    ])
    let v = 1
    let malleability_flag = 1
    let ret = env.ecrecover(hash, sign, v, malleability_flag, 0);
    if (ret != 1) {
        panic()
    }
    if (env.read_register(0) != array_to_bytes([
        227,  45, 244,  40, 101, 233, 113,  53, 172, 251, 101,
        243, 186, 231,  27, 220, 134, 244, 212, 145,  80, 173,
        106,  68,  11, 111,  21, 135, 129,   9, 136,  10,  10,
         43,  38, 103, 247, 231,  37, 206, 234, 112, 198, 115,
          9,  59, 246, 118,  99, 224,  49,  38,  35, 200, 224,
        145, 177,  60, 242, 192, 241,  30, 246,  82
    ])) {
        panic()
    }
}

export function test_log() {
    env.log('\x00\x01\xff')
    env.log('水')
    // equivalent to above one because below is the utf-8 decoding of '水'
    env.log_utf8('\xe6\xb0\xb4')
    // panic, not valid utf 8 sequence
    // env.log_utf8('\x00\x01\xff')
    // equivalent to above one because below is the utf-16 (LE) decoding of '水'
    env.log_utf16('\x34\x6c')
    // panic, not valid utf 16 sequence
    // env.log_utf16('\xe6\xb0\xb4')
}

export function test_promise_create() {
    env.promise_create('john', 'test_log', '', 0, Math.pow(10, 17))
}

export function test_promise_then() {
    let promise_id = env.promise_create('john', 'test_log', '', 0, Math.pow(10, 17))
    env.promise_then(promise_id, 'john', 'test_log', '', 0, Math.pow(10, 17))
}

export function test_promise_and() {
    let id1 = env.promise_create('john', 'test_log', '', 0, Math.pow(10, 17))
    let id2 = env.promise_create('john', 'test_log', '', 0, Math.pow(10, 17))
    env.promise_and(id1, id2)
}

export function test_promise_batch_create() {
    env.promise_batch_create('john')
}

export function test_promise_batch_then() {
    let promise_id = env.promise_batch_create('john')
    env.promise_batch_then(promise_id, 'doe')
}

export function test_promise_batch_action_create_account() {
    let promise_id = env.promise_batch_create('john')
    env.promise_batch_action_create_account(promise_id);
}

export function test_promise_batch_action_deploy_contract() {
    let promise_id = env.promise_batch_create('john')
    env.promise_batch_action_deploy_contract(promise_id, '\x00\x01\x02');
}

export function test_promise_batch_action_function_call() {
    let promise_id = env.promise_batch_create('john')
    env.promise_batch_action_function_call(promise_id, 'hello', '\x01\x02\x03', 0, Math.pow(10, 17))
}

export function test_promise_batch_action_transfer() {
    let promise_id = env.promise_batch_create('john')
    env.promise_batch_action_transfer(promise_id, 1000000000000000000000000n)
}

export function test_promise_batch_action_stake() {
    let promise_id = env.promise_batch_create('john')
    env.promise_batch_action_stake(promise_id, 1000000000000000000000000n, 'ed25519:5do5nkAEVhL8iteDvXNgxi4pWK78Y7DDadX11ArFNyrf')
}

export function test_promise_batch_action_add_key_with_full_access() {
    let promise_id = env.promise_batch_create('john')
    env.promise_batch_action_add_key_with_full_access(promise_id, 'ed25519:5do5nkAEVhL8iteDvXNgxi4pWK78Y7DDadX11ArFNyrf', 0)
}

export function test_promise_batch_action_add_key_with_function_call() {
    let promise_id = env.promise_batch_create('john')
    env.promise_batch_action_add_key_with_function_call(promise_id, 'ed25519:5do5nkAEVhL8iteDvXNgxi4pWK78Y7DDadX11ArFNyrf', 0, 2500000000000000000000000n, 'hello.near', 'hello,hello2')
}

export function test_promise_batch_action_delete_key() {
    let promise_id = env.promise_batch_create('john')
    env.promise_batch_action_delete_key(promise_id, 'ed25519:5do5nkAEVhL8iteDvXNgxi4pWK78Y7DDadX11ArFNyrf')
}

export function test_promise_batch_action_delete_account() {
    let promise_id = env.promise_batch_create('john')
    env.promise_batch_action_delete_account(promise_id, 'hello.near')
}

export function test_promise_results_count() {
    let count = env.promise_results_count()
    if (count != 0) {
        env.panic()
    }
}

export function test_promise_result() {
    let ret = env.promise_result(0, 1)
    if (ret != 1) {
        env.panic()
    }
    if (env.read_register(1) != "abc") {
        env.panic()
    }
}

export function test_promise_return() {
    let promise_id = env.promise_batch_create('john')
    env.promise_return(promise_id)
}

export function test_storage_access() {
    let key1 = 'key1'
    let value1 = 'value1'
    let ret = env.storage_write(key1, value1, 0)
    if (ret != 0) {
        env.panic()
    }
    let ret2 = env.storage_read(key1, 1)
    if (ret2 != 1) {
        env.panic()
    }
    if (env.read_register(1) != value1) {
        env.panic()
    }
    let ret3 = env.storage_has_key(key1)
    if (ret3 != 1) {
        env.panic()
    }
    let ret4 = env.storage_remove(key1, 2)
    if (ret4 != 1) {
        env.panic()
    }
    if (env.read_register(2) != value1) {
        env.panic()
    }
}

export function test_validator_stake() {
    if (env.validator_stake('bob') != 0) {
        env.panic()
    }
}

export function test_validator_total_stake() {
    if (env.validator_total_stake() != 0) {
        env.panic()
    }
}

export function test_alt_bn128_g1_multiexp() {
    let data = array_to_bytes([2,0,0,0,236,211,68,22,5,49,208,12,53,53,39,81,109,176,53,70,11,154,195,76,128,164,20,11,93,190,163,92,21,83,180,18,196,95,226,151,245,145,79,114,53,108,154,143,105,98,129,108,106,158,134,70,46,209,4,187,114,221,167,207,157,130,68,41,247,17,116,136,127,74,120,57,22,9,238,100,102,100,181,173,83,33,171,170,82,165,255,128,205,199,105,7,12,69,43,17,63,146,75,186,73,103,138,165,225,191,45,159,1,175,241,109,54,209,204,135,174,98,194,83,94,127,30,159,139,44,43,3,216,126,95,199,164,228,188,251,70,234,38,82,136,116,245,34,29,83,15,33,172,29,58,206,204,85,141,222,28,116,23,0,26,7,107,96,97,225,254,90,225,10,69,224,199,52,89,177,202,47,47,231,222,201,139,147,79,224,245,60,109,149,228,25])
    let res = array_to_bytes([170,130,186,236,61,114,166,145,249,136,253,42,132,42,195,240,203,62,137,215,25,180,74,242,224,71,160,82,212,169,35,41,97,11,38,77,109,20,52,197,87,81,123,216,80,7,22,72,162,252,194,51,1,81,48,7,92,103,145,65,249,0,58,46])
    env.alt_bn128_g1_multiexp(data, 0)
    env.log(env.read_register(0))
    if (env.read_register(0) != res) {
        panic()
    }
}

export function test_alt_bn128_g1_sum() {
    let data = array_to_bytes([2,0,0,0,0,236,211,68,22,5,49,208,12,53,53,39,81,109,176,53,70,11,154,195,76,128,164,20,11,93,190,163,92,21,83,180,18,196,95,226,151,245,145,79,114,53,108,154,143,105,98,129,108,106,158,134,70,46,209,4,187,114,221,167,207,157,130,68,41,1,63,146,75,186,73,103,138,165,225,191,45,159,1,175,241,109,54,209,204,135,174,98,194,83,94,127,30,159,139,44,43,3,111,126,29,17,114,167,99,64,70,224,74,22,9,246,139,116,64,5,114,96,10,40,22,234,92,74,164,2,86,218,76,48])
    let res = array_to_bytes([232,143,77,24,46,136,147,57,59,95,15,194,34,42,105,2,211,132,177,60,120,78,135,92,93,24,243,206,238,83,46,30,4,32,251,43,88,251,31,157,3,45,168,167,204,48,95,146,30,4,169,133,155,30,68,172,158,143,216,211,84,36,252,3])
    env.alt_bn128_g1_sum(data, 0)
    if (env.read_register(0) != res) {
        panic()
    }
}

export function test_alt_bn128_pairing_check() {
    let data = array_to_bytes([2,0,0,0,117,10,217,99,113,78,234,67,183,90,26,58,200,86,195,123,42,184,213,88,224,248,18,200,108,6,181,6,28,17,99,7,36,134,53,115,192,180,3,113,76,227,174,147,50,174,79,74,151,195,172,10,211,210,26,92,117,246,65,237,168,104,16,4,1,26,3,219,6,13,193,115,77,230,27,13,242,214,195,9,213,99,135,12,160,202,114,135,175,42,116,172,79,234,26,41,212,111,192,129,124,112,57,107,38,244,230,222,240,36,65,238,133,188,19,43,148,59,205,40,161,179,173,228,88,169,231,29,17,67,163,51,165,187,101,44,250,24,68,101,92,128,203,190,51,85,9,43,58,136,68,180,92,110,185,168,107,129,45,30,187,22,100,17,75,93,216,125,23,212,11,186,199,204,1,140,133,11,82,44,65,222,20,26,48,26,132,220,25,213,93,25,79,176,4,149,151,243,11,131,253,233,121,38,222,15,118,117,200,214,175,233,130,181,193,167,255,153,169,240,207,235,28,31,83,74,69,179,6,150,72,67,74,166,130,83,82,115,123,111,208,221,64,43,237,213,186,235,7,56,251,179,95,233,159,23,109,173,85,103,8,165,235,226,218,79,72,120,172,251,20,83,121,201,140,98,170,246,121,218,19,115,42,135,60,239,30,32,49,170,171,204,196,197,160,158,168,47,23,110,139,123,222,222,245,98,125,208,70,39,110,186,146,254,66,185,118,3,78,32,47,179,197,93,79,240,204,78,236,133,213,173,117,94,63,154,68,89,236,138,0,247,242,212,245,33,249,0,35,246,233,0,124,86,198,162,201,54,19,26,196,75,254,71,70,238,51,2,23,185,152,139,134,65,107,129,114,244,47,251,240,80,193,23])
    let ret = env.alt_bn128_pairing_check(data)
    if (ret != 1) {
        panic()
    }
}
