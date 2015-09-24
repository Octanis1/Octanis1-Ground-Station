If ($args.Count -ne 6) {
    echo "Usage: powershell.exe env_var.ps1 user psw host port db gateway"
    Return
}

$user=$args[0]
$psw=$args[1]
$host_=$args[2]
$port=$args[3]
$db=$args[4]
$gateway=$args[5]

$env:MONGODB_ADDON_USER = $user
$env:MONGODB_ADDON_PASSWORD = $psw;
$env:MONGODB_ADDON_HOST = $host_;
$env:MONGODB_ADDON_PORT = $port;
$env:MONGODB_ADDON_DB = $db;
$env:GATEWAY_KEY = $gateway;
$env:PORT = 8080;