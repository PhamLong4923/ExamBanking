/****** Object:  Database [ExamBanking]    Script Date: 4/17/2024 11:27:18 PM ******/
CREATE DATABASE [ExamBanking]  (EDITION = 'GeneralPurpose', SERVICE_OBJECTIVE = 'GP_S_Gen5_2', MAXSIZE = 32 GB) WITH CATALOG_COLLATION = SQL_Latin1_General_CP1_CI_AS, LEDGER = OFF;
GO
ALTER DATABASE [ExamBanking] SET COMPATIBILITY_LEVEL = 150
GO
ALTER DATABASE [ExamBanking] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ExamBanking] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ExamBanking] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ExamBanking] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ExamBanking] SET ARITHABORT OFF 
GO
ALTER DATABASE [ExamBanking] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ExamBanking] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ExamBanking] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ExamBanking] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ExamBanking] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ExamBanking] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ExamBanking] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ExamBanking] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ExamBanking] SET ALLOW_SNAPSHOT_ISOLATION ON 
GO
ALTER DATABASE [ExamBanking] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ExamBanking] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [ExamBanking] SET  MULTI_USER 
GO
ALTER DATABASE [ExamBanking] SET ENCRYPTION ON
GO
ALTER DATABASE [ExamBanking] SET QUERY_STORE = ON
GO
ALTER DATABASE [ExamBanking] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 100, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
/*** The scripts of database scoped configurations in Azure should be executed inside the target database connection. ***/
GO
-- ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 8;
GO
/****** Object:  Table [dbo].[Access]    Script Date: 4/17/2024 11:27:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Access](
	[accessid] [int] IDENTITY(1,1) NOT NULL,
	[fromid] [decimal](38, 0) NULL,
	[toid] [decimal](38, 0) NULL,
	[bankid] [int] NULL,
	[message] [nvarchar](1) NULL,
	[status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[accessid] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 4/17/2024 11:27:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[accid] [decimal](38, 0) IDENTITY(1,1) NOT NULL,
	[username] [varchar](255) NULL,
	[userpass] [varchar](255) NULL,
	[accname] [nvarchar](255) NULL,
	[bankmode] [int] NULL,
	[email] [varchar](255) NULL,
	[datejoin] [datetime] NULL,
	[roleid] [int] NULL,
	[PasswordResetToken] [nvarchar](max) NULL,
	[ResetTokenExpires] [datetime] NULL,
	[isnewbie] [int] NULL,
	[VerificationToken] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[accid] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Answer]    Script Date: 4/17/2024 11:27:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Answer](
	[ansid] [int] IDENTITY(1,1) NOT NULL,
	[anscontent] [nvarchar](max) NULL,
	[ansstatus] [tinyint] NULL,
	[quesid] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ansid] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Bank]    Script Date: 4/17/2024 11:27:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bank](
	[bankid] [int] IDENTITY(1,1) NOT NULL,
	[bankname] [nvarchar](255) NULL,
	[bankstatus] [tinyint] NULL,
	[accid] [decimal](38, 0) NULL,
PRIMARY KEY CLUSTERED 
(
	[bankid] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Mode]    Script Date: 4/17/2024 11:27:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Mode](
	[modeid] [int] IDENTITY(1,1) NOT NULL,
	[qmode] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[modeid] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment]    Script Date: 4/17/2024 11:27:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment](
	[payid] [int] IDENTITY(1,1) NOT NULL,
	[accid] [decimal](38, 0) NULL,
	[paydate] [date] NULL,
	[paycontent] [int] NULL,
	[money] [int] NULL,
	[status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[payid] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Question]    Script Date: 4/17/2024 11:27:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Question](
	[quesid] [int] IDENTITY(1,1) NOT NULL,
	[quescontent] [nvarchar](max) NULL,
	[type] [int] NULL,
	[solution] [nvarchar](max) NULL,
	[secid] [int] NULL,
	[modeid] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[quesid] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Repo]    Script Date: 4/17/2024 11:27:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Repo](
	[repoid] [int] IDENTITY(1,1) NOT NULL,
	[reponame] [nvarchar](100) NULL,
	[bankid] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[repoid] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 4/17/2024 11:27:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[roleid] [int] IDENTITY(1,1) NOT NULL,
	[role] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[roleid] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Section]    Script Date: 4/17/2024 11:27:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Section](
	[secid] [int] IDENTITY(1,1) NOT NULL,
	[secname] [nvarchar](100) NULL,
	[repoid] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[secid] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ticket]    Script Date: 4/17/2024 11:27:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ticket](
	[ticketid] [int] IDENTITY(1,1) NOT NULL,
	[bankid] [int] NULL,
	[accid] [decimal](38, 0) NULL,
	[startdate] [datetime] NULL,
	[expire] [int] NULL,
	[ticketmode] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ticketid] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Access]  WITH CHECK ADD FOREIGN KEY([bankid])
REFERENCES [dbo].[Bank] ([bankid])
GO
ALTER TABLE [dbo].[Access]  WITH CHECK ADD FOREIGN KEY([fromid])
REFERENCES [dbo].[Account] ([accid])
GO
ALTER TABLE [dbo].[Access]  WITH CHECK ADD FOREIGN KEY([toid])
REFERENCES [dbo].[Account] ([accid])
GO
ALTER TABLE [dbo].[Account]  WITH CHECK ADD FOREIGN KEY([roleid])
REFERENCES [dbo].[Role] ([roleid])
GO
ALTER TABLE [dbo].[Answer]  WITH CHECK ADD FOREIGN KEY([quesid])
REFERENCES [dbo].[Question] ([quesid])
GO
ALTER TABLE [dbo].[Bank]  WITH CHECK ADD FOREIGN KEY([accid])
REFERENCES [dbo].[Account] ([accid])
GO
ALTER TABLE [dbo].[Payment]  WITH CHECK ADD FOREIGN KEY([accid])
REFERENCES [dbo].[Account] ([accid])
GO
ALTER TABLE [dbo].[Question]  WITH CHECK ADD FOREIGN KEY([modeid])
REFERENCES [dbo].[Mode] ([modeid])
GO
ALTER TABLE [dbo].[Question]  WITH CHECK ADD FOREIGN KEY([secid])
REFERENCES [dbo].[Section] ([secid])
GO
ALTER TABLE [dbo].[Repo]  WITH CHECK ADD FOREIGN KEY([bankid])
REFERENCES [dbo].[Bank] ([bankid])
GO
ALTER TABLE [dbo].[Section]  WITH CHECK ADD FOREIGN KEY([repoid])
REFERENCES [dbo].[Repo] ([repoid])
GO
ALTER TABLE [dbo].[Ticket]  WITH CHECK ADD FOREIGN KEY([accid])
REFERENCES [dbo].[Account] ([accid])
GO
ALTER TABLE [dbo].[Ticket]  WITH CHECK ADD FOREIGN KEY([bankid])
REFERENCES [dbo].[Bank] ([bankid])
GO
ALTER DATABASE [ExamBanking] SET  READ_WRITE 
GO
