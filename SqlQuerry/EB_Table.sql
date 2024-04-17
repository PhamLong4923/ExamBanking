CREATE DATABASE ExamBanking

CREATE TABLE [Role] (
	[roleid] int PRIMARY KEY IDENTITY(1,1),
	[role] nvarchar(255)
);

CREATE TABLE [Account] (
	[accid] decimal(38, 0) PRIMARY KEY IDENTITY(1,1),
	[username] varchar(255),
	[userpass] varchar(255),
	[accname] nvarchar(255),
	[accmode] int,
	[bankmode] int,
	[email] varchar(255),
	[datejoin] datetime,
	[roleid] int,
	FOREIGN KEY ([roleId]) REFERENCES [Role]([roleid])
);

CREATE TABLE [Bank] (
	[bankid] int PRIMARY KEY IDENTITY(1,1),
	[bankname] nvarchar(255),
	[bankstatus] tinyint,
	[accid] decimal(38,0),
	FOREIGN KEY ([accid]) REFERENCES [Account]([accid])
);

CREATE TABLE [Mode] (
	[modeid] int PRIMARY KEY IDENTITY(1,1),
	[qmode] nvarchar(100)
);



CREATE TABLE [Repository] (
	[repoid] int PRIMARY KEY IDENTITY(1,1),
	[reponame] nvarchar(100),
	[bankid] int, 
	FOREIGN KEY ([bankid]) REFERENCES [Bank]([bankid])
);

CREATE TABLE [Section] (
	[secid] int PRIMARY KEY IDENTITY(1,1),
	[secname] nvarchar(100),
	[repoid] int,
	FOREIGN KEY ([repoid]) REFERENCES [Repository]([repoid])
);

CREATE TABLE [Question] (
	[quesid] int PRIMARY KEY IDENTITY(1,1),
	[quescontent] nvarchar(Max),
	[type] int,
	[solution] nvarchar(Max),
	[secid] int,
	[modeid] int,
	FOREIGN KEY ([modeid]) REFERENCES [Mode]([modeid]),
	FOREIGN KEY ([secid]) REFERENCES [Section]([secid])
);

CREATE TABLE [Answer] (
	[ansid] int PRIMARY KEY IDENTITY(1,1),
	[anscontent] nvarchar(Max),
	[ansstatus] tinyint,
	[quesid] int,
	FOREIGN KEY ([quesid]) REFERENCES [Question]([quesid]),
);


CREATE TABLE [Payment] (
	[payid] int PRIMARY KEY IDENTITY(1,1),
	[accid] decimal(38, 0),
	[paydate] date,
	[paycontent] int,
	[money] int,
	[status] int,
	FOREIGN KEY ([accid]) REFERENCES [Account]([accid])
);


CREATE TABLE [Access] (
	[accessid] int PRIMARY KEY IDENTITY(1,1),
	[fromid] decimal(38,0),
	[toid] decimal(38,0),
	[bankid] int,
	[message] nvarchar,
	[status] int,
	FOREIGN KEY ([fromid]) REFERENCES [Account]([accid]),
	FOREIGN KEY ([toid]) REFERENCES [Account]([accid]),
	FOREIGN KEY ([bankid]) REFERENCES [Bank]([bankid]),
)


CREATE TABLE [Ticket] (
	[ticketid] int PRIMARY KEY IDENTITY(1,1),
	[bankid] int,
	[accid] decimal(38, 0),
	[startdate] datetime,
	[expire] int,
	[ticketmode] int,
	FOREIGN KEY ([accid]) REFERENCES [Account]([accid]),
	FOREIGN KEY ([bankid]) REFERENCES [Bank]([bankid]),
);






