#!/bin/sh

aws dynamodb scan --table-name Gameday-e4agrido45b77anhcxwe6prw64-master > gameday_master.json
aws dynamodb scan --table-name Game-e4agrido45b77anhcxwe6prw64-master > game_master.json
aws dynamodb scan --table-name Player-e4agrido45b77anhcxwe6prw64-master > player_master.json

put_item(){
    echo $1
    echo $2

    index=0
    jq -c '.Items[]' $1 | while read i; do
    index=$((index+1))
    echo $index
    echo $i
    aws dynamodb put-item --table-name $2 --item $i --return-consumed-capacity TOTAL > log.txt
done

}

put_item gameday_master.json Gameday-osdbgrbafvgqxhttwhzyefpibe-main
put_item game_master.json Game-osdbgrbafvgqxhttwhzyefpibe-main
put_item player_master.json Player-osdbgrbafvgqxhttwhzyefpibe-main




